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
		logNewCmds: function(Vantage_log) {Vantage_log( 'Commands:\n' + newOptions.map(function(i,e){ return ' - ' + i + '\n' }).join('') );}
	};

	
	VantageProxy
		.command('version inspect', 'inspect version ' + version)
		.action(function(cmd,cb) {
			var Vantage_log = this.log.bind(this);

			Vantage_log(
				'Author' + '\n'
				+' * Nabil Redmann (BananaAcid)' + '\n'
				+' * bananaacid.de' + '\n'
			);
			VantageProxy.logNewCmds(Vantage_log);
			cb();
		});


	VantageProxy
		.command('i [object]', 'Inspect an object (Util.inspect)')
		//.description('Utils.inspect')
		.action(function(args, cb) {
			var Vantage_log = this.log.bind(this);

			if (args.object == undefined)
				Vantage_log('Missing object to inspect!')
			else
				try {
					with (options.context)
					{
						var ret = eval(args.object);
						if (typeof(ret) === 'function')
							if (cardinal)
								Vantage_log(cardinal.highlight(ret, {json: true, linenos: true}));
							else
								Vantage_log(ret.toString());

						Vantage_log(Util.inspect(ret, {showHidden: true, colors: true, depth: 0}));
					}
				}
				catch (e) {Vantage_log(e);}

			cb();
		});

	VantageProxy
		.command('il [object]', 'Inspect an object completely (Util.inspect)')
		//.description('Utils.inspect')
		.action(function(args, cb) {
			var Vantage_log = this.log.bind(this);
			
			if (args.object == undefined)
				Vantage_log('Missing object to inspect!');
			else
				try {
					with (options.context)
					{
						var ret = eval(args.object);
						if (typeof(ret) === 'function')
							if (cardinal)
								Vantage_log(cardinal.highlight(ret, {json: true, linenos: true}));
							else
								Vantage_log(ret.toString());

						Vantage_log(Util.inspect(ret, {showHidden: true, colors: true, depth: 100}));
					}
				}
				catch (e) {Vantage_log(e);}

			cb();
		});
};