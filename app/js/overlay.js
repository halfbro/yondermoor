const React = require('react');
module.exports = class extends React.Component {
  /* Default react constructor, binds game to overlay */
  constructor(props) {
    super(props);

    this.game = this.props.game;
  }

  render() {
    return (
      <div>
        <div className="hud" style={{top: 0, left: 0, width: 30, height: 30}}>
          Test
        </div>
      </div>
    );
  }
};
