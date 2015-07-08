/** @jsx React.DOM */
var React = require('react/addons');

var elephant = React.createClass({
	componentDidMount: function () {
		console.log('fakeData');
	},

	render: function () {
		return (
            <li className={"item span3"}>
                <div className={"hheader"}>
                    <a href={"http://www.163.com"}>
                        <img src={"/images/demo/luo.jpeg"} />
                    </a>
                </div>
                <div className={"hbody"}>
                    <p>
                        <small> 名称: </small>
                        <span>铜</span>
                    </p>
                    <p>
                        <small> 名称: </small>
                        <span>铜</span>
                    </p>
                    <p>
                        <small> 挂牌量: </small>
						<span>500吨</span>
                    </p>
                    <p>
                        <small> 起订量: </small>
						<span>1吨</span>
                    </p>
                    <p>
                        <small> 供货商: </small>
						<span>美国鸭梨山大有限公司</span>
                    </p>

                </div>
            </li>
	) }

});

module.exports = elephant;
