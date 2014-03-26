/*
 *   This program is free software; you can redistribute it and/or
 *   modify it under the terms of the GNU General Public License
 *   as published by the Free Software Foundation; either version 2
 *   of the License, or (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, write to the Free Software
 *   Foundation, Inc., 51 Franklin Street, Fifth Floor,
 *   Boston, MA  02110-1301, USA.
 *
 *   ---
 *   Copyright (C) 2014, Aesir Development Team <admin@aesir.url.ph>
 */

define(['KObject', 'KBase'], function(KObject, K){
    return KObject.extend({
        init:function(id, grab){
            this.constructor.super.call(this);
            if(typeof id == 'object')
                this.element = id;
            else
                this.element = K(id);
            this.keys = {};
            KKEYBOARDS[this.id=KKEYBOARDS.count++] = this;
            if(grab)
                this.grab = true;
            else
                this.grab = false;
            this.element.assignedKKeyboard = this;
            this.element.onkeypress = this.keyPress;
            this.element.onkeyup = this.keyUp;
            this.element.onkeydown = this.keyDown;
        },
        keyPress: function(e){
            this.assignedKKeyboard.emit("keyPress", e.which);
        },
        keyDown: function(e){
            var key = e.which;
            this.assignedKKeyboard.keys[key] = true;
            this.assignedKKeyboard.emit("keyDown", key);
            if(this.assignedKKeyboard.grab) return false;
        },
        keyUp: function(e){
            var key = e.which;
            this.assignedKKeyboard.keys[key] = false;
            this.assignedKKeyboard.emit("keyPress", key);
            if(this.assignedKKeyboard.grab) return false;
        },
    });
});
