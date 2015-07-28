/**
 * @author Nabil Redmann (BananaAcid)
 * @url    banaacid.de/
 */

module.exports = function(Vantage, options) 
{
	const version = require('../package.json').version;

	const Util = require('util');
	var newOptions = []
	  , cardinal = null; try { cardinal = require('cardinal'); } catch (e) {};


	if (!options || typeof(options.context) !== 'object')
		throw 'missing options.context={..} in Vantage.use()';


	var VantageProxy = {
		command: function(cmd, desc)
		{ newOptions.push(cmd); return Vantage.command(cmd, desc); },
		mode: function(cmd, desc) { newOptions.push(cmd); return Vantage.mode(cmd, desc); },
		logNewCmds: function() {Vantage.log( 'Commands:\n' + newOptions.map(function(i,e){ return ' - ' + i + '\n' }).join('') );}
	};

	
	VantageProxy
		.command('version inspect', 'inspect version ' + version)
		.action(function(cmd,cb) {
			Vantage.log(
				'Author' + '\n'
				+' * Nabil Redmann (BananaAcid)' + '\n'
				+' * bananaacid.de' + '\n'
			);
			VantageProxy.logNewCmds();
			cb();
		});


	VantageProxy
		.command('i [object]', 'Inspect an object (Util.inspect)')
		//.description('Utils.inspect')
		.action(function(args, cb) {
			if (args.object == undefined)
				Vantage.log('Missing object to inspect!')
			else
				try {
					with (options.context)
					{
						var ret = eval(args.object);
						if (typeof(ret) === 'function')
							if (cardinal)
								Vantage.log(cardinal.highlight(ret, {json: true, linenos: true}));
							else
								Vantage.log(ret.toString());

						Vantage.log(Util.inspect(ret, {showHidden: true, colors: true, depth: 0}));
					}
				}
				catch (e) {Vantage.log(e);}

			cb();
		});

	VantageProxy
		.command('il [object]', 'Inspect an object completely (Util.inspect)')
		//.description('Utils.inspect')
		.action(function(args, cb) {
			if (args.object == undefined)
				Vantage.log('Missing object to inspect!');
			else
				try {
					with (options.context)
					{
						var ret = eval(args.object);
						if (typeof(ret) === 'function')
							if (cardinal)
								Vantage.log(cardinal.highlight(ret, {json: true, linenos: true}));
							else
								Vantage.log(ret.toString());

						Vantage.log(Util.inspect(ret, {showHidden: true, colors: true, depth: 100}));
					}
				}
				catch (e) {Vantage.log(e);}

			cb();
		});
};