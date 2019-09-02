"""Helper functions to make dealing with blockly oddities easier.


"""

def blockly_add_nitpic(e, ligand="X", lattice="M"):
	"""Update the "M" (macromolecule/lattice) and "X" (ligand) component of a nitpic experiment to those specified by ligand and lattice kwargs."""

	e.change_component_name("X", ligand)
	e.change_component_name("M", lattice)
	return e