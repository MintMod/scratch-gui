import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';

import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/tw-project-input/project-input.jsx';
import About from '../components/tw-home/about.jsx';
import Title from '../components/tw-home/title.jsx';

import styles from './gui.css';

const onClickLogo = () => {
    // close any project if loaded
    location.hash = '';
};

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
    // Warn before navigating away
    window.onbeforeunload = () => true;
}

const Player = ({isPlayerOnly, projectId}) => (
    <div className={classNames(isPlayerOnly ? styles.stageOnly : styles.editor)}>
        {isPlayerOnly ? (
            <MenuBar
                onClickLogo={onClickLogo}
                canManageFiles
                canChangeLanguage
                enableSeeInside
            />
        ) : null}
        <div className={styles.center}>
            {isPlayerOnly ? (
                <Title />
            ) : null}
            <GUI
                onClickLogo={onClickLogo}
                cloudHost={'cirrus.garbomuffin.com'}
                canSave={false}
                canEditTitle
                enableCommunity
                isPlayerOnly={isPlayerOnly}
                projectId={projectId}
            />
            {isPlayerOnly ? (
                <div className="about">
                    <ProjectInput />
                    {/* {canSeeInside ? (
                        <div className={styles.seeInside}>
                            <SeeInside />
                        </div>
                    ) : null} */}
                    <About />
                    {/* fixme: remove this in a few days */}
                    <p>The See Inside button is in the menu bar now.</p>
                </div>
            ) : null}
        </div>
    </div>
);

Player.propTypes = {
    isPlayerOnly: PropTypes.bool,
    projectId: PropTypes.string
};

const mapStateToProps = state => ({
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
});

const mapDispatchToProps = dispatch => ({

});

const ConnectedPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);

// note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.
const WrappedPlayer = compose(
    AppStateHOC,
    HashParserHOC
)(ConnectedPlayer);

export default WrappedPlayer;
