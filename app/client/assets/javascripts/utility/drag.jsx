import EventEmitter from 'events';

import React from 'react';

import GameConstants from '../flux/constants/GameConstants';

class Drag extends EventEmitter{
    static instance;

    static dragSource;
    static dragTarget;
    static isDragging;

    static GetInstance() {
        return new Drag();
    }

    constructor() {
        super();

        if(Drag.instance) {
            return Drag.instance;
        }

        this.validation = function() { return true; };

        Drag.instance = this;
    }

    ResolveParent(identifier, child, max_level) {
        if(child.id.search(identifier) >= 0 || max_level == 0) {
            return child;
        }

        return this.ResolveParent(identifier, child.parentElement, max_level - 1);
    }

    UpdateDragAndDropValiation(callback) {
        this.validation = callback;
    }

    addDropListener(callback) {
        this.on(GameConstants.EVENT_DROP_DICE, callback);
    }

    removeDropListener(callback) {
        this.removeListener(GameConstants.EVENT_DROP_DICE, callback);
    }

    onDragStart(event) {
        Drag.isDragging = true;
        Drag.dragSource = event.target;
    }

    onDragEnd(event) {
        Drag.dragSource = null;
        Drag.dragTarget = null;
        Drag.isDragging = false;
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDrop(event) {
        Drag.dragTarget = Drag.GetInstance().ResolveParent('droppable', event.target, 5);

        if(Drag.GetInstance().validation(Drag.dragSource, Drag.dragTarget)) {
            Drag.GetInstance().emit(GameConstants.EVENT_DROP_DICE, Drag.dragSource, Drag.dragTarget);
        }

        Drag.dragSource = null;
        Drag.dragTarget = null;
        Drag.isDragging = false;
    }
}

export default Drag;
