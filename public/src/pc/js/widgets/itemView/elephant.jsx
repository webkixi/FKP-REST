/** @jsx React.DOM */
var config = require('../../config');

var imagePath = config.imagePath;

var elephant = React.createClass({
	componentDidMount: function () {
		console.log('fakeData');
	},

	render: function () {
		var clsName = "item wid-3";
		itemStyle = '';
		var sty = {};
		var wid = '';
		var data = this.props.data;

		if(data){
			k1 = data.catName2||'';
			v1 = data.vender||'';

			k2 = data.catName2||'';
			v2 = data.model||'';

			k3 = data.stock||'';
			v3 = data.unitName||'';

			k4 = data.minQuantity||'';
			v4 = data.unitName||'';

			k5 = data.accountName||'';
			v5 = '';
		}
		var image = '/images/blank.gif';
		if(data.picture){
			image = imagePath+data.picture;
		}

		if(this.props.itemClass){
			clsName = "item "+this.props.itemClass;
		}
		if(this.props.itemStyle){
			clsName = 'item';
			sty = this.props.itemStyle;
			// wid = sty.width;
		}
		return (
            <li className={clsName} style={sty}>
                <div className={"inner"}>
					<div className={"hheader"}>
	                    <a href={"http://www.163.com"}>
	                        <img src={image} />
	                    </a>
	                </div>
	                <div className={"hbody"}>
	                    <p>
	                        <small> {k1}: </small>
	                        <span>{v1}</span>
	                    </p>
	                    <p>
	                        <small> {k2}: </small>
	                        <span>{v2}</span>
	                    </p>
	                    <p>
	                        <small> 挂牌量: </small>
							<span>{k3} {v3}</span>
	                    </p>
	                    <p>
	                        <small> 起订量: </small>
							<span>{k4} {v4} </span>
	                    </p>
	                    <p>
	                        <small> 供货商: </small>
							<span>{k5}</span>
	                    </p>

	                </div>
				</div>
            </li>
	) }

});

module.exports = elephant;
