Blockly.Python.INDENT = "\t"

Blockly.Python.addIndents = function(code, indent_char, indent_count){
	var a = code.split("\n");
	var indent = "";

	for(var i=0; i<indent_count; i++)
		indent+=indent_char;

	for(var i=0; i<a.length; i++)
		a[i] = indent + a[i];
	
	return a.join("\n");
}

Blockly.Python.addReservedWords("itcsimlib,model,simulator,c_index");

Blockly.Python.finish = function(code){
	var dirname = Code.dirname;

	return `import sys
sys.path.append("${dirname}")

from itcsimlib import *
from itcsimlib.thermo import *
from itcsimlib.utilities import *
from itcsimlib import model_ising, model_independent
from itcsimlib import itc_experiment

true = True
false = False
${code}
`;

}

Blockly.Python['make_simulator'] = function(block) {
	var number_t0 = block.getFieldValue('T0');
	var dropdown_units = block.getFieldValue('UNITS');
	var value_model = Blockly.Python.valueToCode(block, 'MODEL', Blockly.Python.ORDER_NONE);

	var code = `
${value_model}

simulator = ITCSim(
	T0 = ${number_t0},
	units = "${dropdown_units}"
)
`;
	if(value_model != "")
		code += `
simulator.set_model(model)
`;
	return code;

};

Blockly.Python['synthetic_experiment'] = function(block) {
	var text_title = block.getFieldValue('TITLE');
	var text_ligand_name = block.getFieldValue('LIGAND_NAME');
	var number_ligand_conc = block.getFieldValue('LIGAND_CONC');
	var text_lattice_name = block.getFieldValue('LATTICE_NAME');
	var number_lattice_conc = block.getFieldValue('LATTICE_CONC');
	var value_temperature = Blockly.Python.valueToCode(block, 'TEMPERATURE', Blockly.Python.ORDER_NONE);
	var value_cell_volume = Blockly.Python.valueToCode(block, 'CELL_VOLUME', Blockly.Python.ORDER_NONE);
	var value_noise = Blockly.Python.valueToCode(block, 'NOISE', Blockly.Python.ORDER_NONE);
	var value_inj_volumes = Blockly.Python.valueToCode(block, 'INJ_VOLUMES', Blockly.Python.ORDER_NONE);

	number_ligand_conc = number_ligand_conc / 1E3;
	number_lattice_conc = number_lattice_conc / 1E3;

	var code = `itc_experiment.ITCExperimentSynthetic(
	T = ${value_temperature},
	title = "${text_title}",
	Syringe = {
		"${text_ligand_name}": ${number_ligand_conc}
	},
	Cell = {
		"${text_lattice_name}": ${number_lattice_conc}
	},
	V0 = ${value_cell_volume},
	injections = ${value_inj_volumes},
	noise = ${value_noise}
)`;
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['simulator_experiments'] = function(block) {
	var code = `simulator.experiments`;
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['plot_experiment_data'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
  var dropdown_extension = block.getFieldValue('EXTENSION');
  var value_directory = Blockly.Python.valueToCode(block, 'DIRECTORY', Blockly.Python.ORDER_NONE);
  var value_prefix = Blockly.Python.valueToCode(block, 'PREFIX', Blockly.Python.ORDER_NONE);

  if(value_name == "")
  	value_name = "None"

	var code = `
if isinstance(${value_name}, basestring):
	e = simulator.get_experiment_by_title(${value_name})
else:
	e = ${value_name}
e.make_plot(hardcopy=True,hardcopydir='${value_directory}',hardcopyprefix='${value_prefix}',hardcopytype='${dropdown_extension}')
`;

  return code;
};

Blockly.Python['add_experiment'] = function(block) {
	var value_experiment = Blockly.Python.valueToCode(block, 'EXPERIMENT', Blockly.Python.ORDER_NONE);
	var code = `
simulator.add_experiment( ${value_experiment} )
	`;
	return code;
};

Blockly.Python['independent_modes_model'] = function(block) {
	var number_modes = block.getFieldValue('MODES');
	var text_ligand_name = block.getFieldValue('LIGAND_NAME');
	var text_lattice_name = block.getFieldValue('LATTICE_NAME');
	
	var code = `
model = model_independent.Nmodes(
	modes = ${number_modes},
	lattice_name = "${text_lattice_name}",
	ligand_name = "${text_ligand_name}"
)
`;
	
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['simulator_done'] = function(block) {
	var code = `
simulator.done()
	`;
	return code;
};

Blockly.Python['set_model_parameter'] = function(block) {
	var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
	var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE);
	var code = `
simulator.set_model_param(${value_name},${value_value})
	`;
	return code;
};

Blockly.Python['get_model_parameters'] = function(block) {
	var dropdown_type = block.getFieldValue('TYPE');

	var code = `[p for p in simulator.model.get_param_names() if simulator.model.get_param_type(p) == "${dropdown_type}"]`;

	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['setup_ising_model'] = function(block) {
		var text_name = block.getFieldValue('NAME');
		var number_nsites = block.getFieldValue('NSITES');
		var checkbox_circular = block.getFieldValue('CIRCULAR') == 'TRUE';
		var statements_parameters = Blockly.Python.statementToCode(block, 'PARAMETERS');
		var statements_configuration = Blockly.Python.statementToCode(block, 'CONFIGURATION');
		
		statements_configuration = Blockly.Python.addIndents(statements_configuration, Blockly.Python.INDENT, 2)

		var code = `
class BlocklyIsingModel(model_ising.Ising):
	def __init__(self, *args, **kwargs):
		model_ising.Ising.__init__(self, *args, **kwargs)

		self.precision = 1E-15

${statements_parameters}

	def blockly_param(self, value):
		if isinstance(value, basestring):
			if value in self.params:
				return self.params[value]
			else:
				raise Exception("Unrecognized Ising model parameter '"+value+"'")
		else:
			return value

	def blockly_symbol(self, value):
		if isinstance(value, basestring):
			if value in self.params:
				return self.parameter_symbols[value]
			else:
				raise Exception("Unrecognized Ising model parameter '"+value+"'")
		else:
			return value
	
	def set_energies(self, T0, T):
		for c_index in xrange(self.nconfigs):
			self.gibbs[c_index] = 0.0
			self.enthalpies[c_index] = 0.0
			self.config_expressions[c_index] = 0.0

${statements_configuration}

model = BlocklyIsingModel(nsites = ${number_nsites}, circular = ${checkbox_circular})
		`;

		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['site_is_occupied'] = function(block) {
		var value_site = Blockly.Python.valueToCode(block, 'SITE', Blockly.Python.ORDER_NONE);
		var dropdown_occupied = block.getFieldValue('OCCUPIED');

		var code = `self.get_site_occupancy(c_index, ${value_site})`;
		
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['configuration_sites'] = function(block) {
		var dropdown_type = block.getFieldValue('TYPE');
		
		if( dropdown_type == "OCCUPIED")
			var code = `[s_index -1 for s_index in xrange(1, self.nsites +1) if self.get_site_occupancy(config, s_index -1)]`;
		else if( dropdown_type == "EMPTY" )
			var code = `[s_index -1 for s_index in xrange(1, self.nsites +1) if not self.get_site_occupancy(config, s_index -1)]`;
		else
			var code = `xrange(1, self.nsites +1)`;

		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['add_ising_parameter'] = function(block) {
	var dropdown_type = block.getFieldValue('TYPE');
	var text_name = block.getFieldValue('NAME');

	if( dropdown_type == "dG" )
		var code = `
	self.add_parameter( "${text_name}", "dG" )`;
	else if( dropdown_type == "dH" )
		var code = `
	self.add_parameter( "${text_name}", "dH" )`;
	else if ( dropdown_type == "dCp" )
		var code = `
	self.add_parameter( "${text_name}", "dCp" )`;
	else if ( dropdown_type == "n" )
		var code = `
	self.add_parameter( "${text_name}", "n" )`;

	return code;
};

Blockly.Python['add_dg_model_value'] = function(block) {
		var value_dg = Blockly.Python.valueToCode(block, 'DG', Blockly.Python.ORDER_NONE);
		var value_dh = Blockly.Python.valueToCode(block, 'dH', Blockly.Python.ORDER_NONE);
		var value_dcp = Blockly.Python.valueToCode(block, 'DCP', Blockly.Python.ORDER_NONE);

		if(value_dh == "")
			value_dh = 0.0
		if(value_dcp == "")
			value_dcp = 0.0

		var code = `
self.gibbs[c_index] += dG_vant_Hoff(
	self.blockly_param(${value_dg}),
	self.blockly_param(${value_dh}),
	self.blockly_param(${value_dcp}),
	T, T0)

self.config_expressions[c_index] += self.blockly_symbol(${value_dg})
`;
		return code;
};

Blockly.Python['add_dh_model_value'] = function(block) {
		var value_dh = Blockly.Python.valueToCode(block, 'dH', Blockly.Python.ORDER_NONE);
		var value_dcp = Blockly.Python.valueToCode(block, 'DCP', Blockly.Python.ORDER_NONE);

		if(value_dcp == "")
			value_dcp = 0.0

		var code =`
self.enthalpies[c_index] += dH_vant_Hoff(
	self.blockly_param(${value_dh}),
	self.blockly_param(${value_dcp}),
	T, T0)
`;
		return code;
};

Blockly.Python['run_simulator'] = function(block) {
	// TODO: Assemble Python into code variable.
	var code = `
simulator.run()
`;
	return code;
};