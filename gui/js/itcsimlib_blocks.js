Blockly.Blocks['make_simulator'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Create simulator");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Reference temperature:")
        .appendField(new Blockly.FieldNumber(273.15, 0), "T0")
        .appendField("K");
    this.appendDummyInput()
        .appendField("Energy units:")
        .appendField(new Blockly.FieldDropdown([["kcal","kcal"], ["Joules","J"], ["kJ","kJ"]]), "UNITS");
    this.appendValueInput("MODEL")
        .setCheck("Model")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Model");
    this.setNextStatement(true, "Simulator");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['synthetic_experiment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Simulated experiment named")
        .appendField(new Blockly.FieldTextInput("title"), "TITLE")
        .appendField(",");
    this.appendDummyInput()
        .appendField("where")
        .appendField(new Blockly.FieldTextInput("Ligand"), "LIGAND_NAME")
        .appendField("at")
        .appendField(new Blockly.FieldNumber(1, 0), "LIGAND_CONC")
        .appendField("mM is added to")
        .appendField(new Blockly.FieldTextInput("Lattice"), "LATTICE_NAME")
        .appendField("at")
        .appendField(new Blockly.FieldNumber(0.01, 0), "LATTICE_CONC")
        .appendField("mM");
    this.appendValueInput("TEMPERATURE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Temperature (K)");
    this.appendValueInput("CELL_VOLUME")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Cell Volume (uL)");
    this.appendValueInput("NOISE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Noise (%)");
    this.appendValueInput("INJ_VOLUMES")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Injections (List)");
    this.setOutput(true, "Experiment");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['read_nitpic_exp'] = {
  init: function() {
    this.appendValueInput("file")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("NITPIC experiment file where")
        .appendField(new Blockly.FieldTextInput("Ligand"), "LIGAND_NAME")
        .appendField("was added to")
        .appendField(new Blockly.FieldTextInput("Lattice"), "LATTICE_NAME");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Recalculate component concentrations")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "recalc_concs");
    this.setInputsInline(false);
    this.setOutput(true, "Experiment");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['change_component_name'] = {
  init: function() {
    this.appendValueInput("experiment")
        .setCheck("Experiment")
        .appendField("Change component name")
        .appendField(new Blockly.FieldTextInput("default"), "old_name")
        .appendField("to")
        .appendField(new Blockly.FieldTextInput("default"), "new_name");
    this.setOutput(true, "Experiment");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['simulator_experiments'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Simulator experiments");
    this.setOutput(true, "Array");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['plot_experiment_data'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(["Experiment", "String"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Plot experiment");
    this.appendValueInput("DIRECTORY")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("as")
        .appendField(new Blockly.FieldDropdown([[".png","png"], [".pdf","pdf"]]), "EXTENSION")
        .appendField("in directory");
    this.appendValueInput("PREFIX")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("with prefix");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['add_experiment'] = {
  init: function() {
    this.appendValueInput("EXPERIMENT")
        .setCheck("Experiment")
        .appendField("Add experiment to simulator");
    this.setPreviousStatement(true, "Simulator");
    this.setNextStatement(true, "Simulator");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['independent_modes_model'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Independent sites with")
        .appendField(new Blockly.FieldNumber(2, 1), "MODES")
        .appendField("binding modes");
    this.appendDummyInput()
        .appendField("Where")
        .appendField(new Blockly.FieldTextInput("Ligand"), "LIGAND_NAME")
        .appendField("(s) bind to a")
        .appendField(new Blockly.FieldTextInput("Lattice"), "LATTICE_NAME");
    this.setOutput(true, "Model");
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['simulator_done'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Shutdown simulator");
    this.setPreviousStatement(true, "Simulator");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['set_model_parameter'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(["String", "Parameter"])
        .appendField("Set model parameter");
    this.appendValueInput("VALUE")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "Simulator");
    this.setNextStatement(true, "Simulator");
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['get_model_parameters'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["dG","dG"], ["dH","dH"], ["dCp","dCp"]]), "TYPE")
        .appendField("model parameters");
    this.setOutput(true, "Array");
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['setup_ising_model'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ising model called")
        .appendField(new Blockly.FieldTextInput("name"), "NAME");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Number of sites")
        .appendField(new Blockly.FieldNumber(1, 0), "NSITES");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Circular lattice")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "CIRCULAR");
    this.appendStatementInput("PARAMETERS")
        .setCheck("Parameter")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Parameters");
    this.appendStatementInput("CONFIGURATION")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Lattice behavior");
    this.setInputsInline(false);
    this.setOutput(true, "Model");
    this.setColour(230);
 this.setTooltip("Set up Model");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['site_is_occupied'] = {
  init: function() {
    this.appendValueInput("SITE")
        .setCheck(["Site", "Number"])
        .appendField("site");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["is","True"], ["is not","False"]]), "OCCUPIED")
        .appendField("occupied");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['configuration_sites'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["all","ALL"], ["occupied","OCCUPIED"], ["empty","EMPTY"]]), "TYPE")
        .appendField("sites in the configuration");
    this.setOutput(true, "Array");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['add_ising_parameter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("A")
        .appendField(new Blockly.FieldDropdown([["dG","dG"], ["dH","dH"], ["dCp","dCp"]]), "TYPE")
        .appendField("parameter called")
        .appendField(new Blockly.FieldTextInput("name"), "NAME");
    this.setPreviousStatement(true, "Parameter");
    this.setNextStatement(true, "Parameter");
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['add_dg_model_value'] = {
  init: function() {
    this.appendValueInput("DG")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Add the value of dG parameter");
    this.appendValueInput("dH")
        .setCheck(["String", "Number"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("dH");
    this.appendValueInput("DCP")
        .setCheck(["String", "Number"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("dCp");
    this.setPreviousStatement(true, "Configuration");
    this.setNextStatement(true, "Configuration");
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['add_dh_model_value'] = {
  init: function() {
    this.appendValueInput("dH")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Add the value of dH parameter");
    this.appendValueInput("DCP")
        .setCheck(["String", "Number"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("dCp");
    this.setPreviousStatement(true, "Configuration");
    this.setNextStatement(true, "Configuration");
    this.setColour(210);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['run_simulator'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Run simulator");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "Simulator");
    this.setNextStatement(true, "Simulator");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['get_partition_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Print partition function");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Convert dGs to K")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "substitute_Ks");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Aggressively simplify expression")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "full_simplify");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Export as LaTeX")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "as_latex");
    this.appendValueInput("file")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("File name:");
    this.setPreviousStatement(true, "Simulator");
    this.setNextStatement(true, "Simulator");
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['draw_lattices'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Draw lattices");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Scale:")
        .appendField(new Blockly.FieldNumber(1, 0, Infinity, 1), "size");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("dG tolerance:")
        .appendField(new Blockly.FieldNumber(6, 1), "dG_tolerance");
    this.appendValueInput("file")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("File name:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "Simulator");
    this.setNextStatement(true, "Simulator");
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};