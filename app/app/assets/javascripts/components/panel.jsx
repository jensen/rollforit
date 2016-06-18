var PanelBackground = {
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    height: '120px',
    width: '100%',
    backgroundColor: '#3498DB'
};

var Panel = React.createClass({
    render: function() {
        return (
            <div style={PanelBackground}>
                <DiceTray url='/dice' />
            </div>
        );
    }
});
