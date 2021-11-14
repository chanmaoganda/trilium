"use strict";

const AbstractEntity = require('./abstract_entity');
const shareRoot = require("../../share_root");

class Branch extends AbstractEntity {
    constructor([branchId, noteId, parentNoteId, prefix, notePosition, isExpanded]) {
        super();

        /** @param {string} */
        this.branchId = branchId;
        /** @param {string} */
        this.noteId = noteId;
        /** @param {string} */
        this.parentNoteId = parentNoteId;
        /** @param {string} */
        this.prefix = prefix;
        /** @param {int} */
        this.notePosition = notePosition;
        /** @param {boolean} */
        this.isExpanded = !!isExpanded;

        if (this.noteId === shareRoot.SHARE_ROOT_NOTE_ID) {
            return;
        }

        const childNote = this.childNote;
        const parentNote = this.parentNote;

        if (!childNote.parents.includes(parentNote)) {
            childNote.parents.push(parentNote);
        }

        if (!childNote.parentBranches.includes(this)) {
            childNote.parentBranches.push(this);
        }

        if (!parentNote) {
            console.log(this);
        }

        if (!parentNote.children.includes(childNote)) {
            parentNote.children.push(childNote);
        }

        this.shaca.branches[this.branchId] = this;
        this.shaca.childParentToBranch[`${this.noteId}-${this.parentNoteId}`] = this;
    }

    /** @return {Note} */
    get childNote() {
        return this.shaca.notes[this.noteId];
    }

    getNote() {
        return this.childNote;
    }

    /** @return {Note} */
    get parentNote() {
        return this.shaca.notes[this.parentNoteId];
    }
}

module.exports = Branch;
