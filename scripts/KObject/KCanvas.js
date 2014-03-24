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
 *   Copyright (C) 2014, Jan Keith Darunday <jkcdarunday@uplb.edu.ph>
 */

define(['KThread', 'KObject', 'KScene', 'KBase'], function(KThread, KObject, KScene, K){
    var KCanvas = KThread.extend({
        init: function(id){
            KThread.call(this, this.update, 1000/30);
            console.log("Created KCanvas " + id + " with interval " + this.interval);
            this.canvasElement = K(id);
            console.log(this.canvasElement);
            this.height = this.canvasElement.height;
            this.width = this.canvasElement.width;
            this.canvas = this.canvasElement.getContext("2d");
//             this.constructor.super.call(this);
            this.fps = 30;
            this.scene = null;

        },
        setFrameRate: function(fps){
            if(fps>1) this.fps = fps;
            this.setInterval(fps);
        },
        clear: function(){
            this.canvas.fillStyle="white";
            this.canvas.fillRect(0,0,this.canvasElement.width,this.canvasElement.width);
        },
        update: function(){
            this.clear();
            if(this.scene != null && this.scene != undefined){
                this.scene.emit("update");
                this.scene.emit("draw", this.canvas);
            }
        }
    });
    return KCanvas;
});
