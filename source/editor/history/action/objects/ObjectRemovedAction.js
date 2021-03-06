"use strict";

//Object removed.
function ObjectRemovedAction(object, parent)
{
	Action.call(this);
	
	this.object = object;
	this.parent = (parent !== undefined) ? parent : object.parent;
}

ObjectRemovedAction.prototype.apply = function()
{
	if(this.object instanceof THREE.Camera)
	{
		var scene = this.object.getScene();
		if(scene !== null)
		{
			scene.removeCamera(this.object);
		}
	}
	
	this.parent.remove(this.object);

	this.updateGUI();
};

ObjectRemovedAction.prototype.revert = function()
{
	this.parent.add(this.object);

	this.updateGUI();
};

ObjectRemovedAction.prototype.updateGUI = function()
{
	if(Editor.isObjectSelected(this.object))
	{
		Editor.removeFromSelection(this.object);
	}

	Editor.gui.treeView.updateObjectsView();
};
