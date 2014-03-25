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

define(['KObject', 'KSmoothVariable'], function(KObject, KSmoothVariable){
    return KObject.extend({
        init:function(text){
            this.canvasPositionX = new KSmoothVariable({value:0}, this);
            this.canvasPositionY = new KSmoothVariable({value:0}, this);
            this.font = "Sans";
            this.size = "12pt";
            this.attachment = 'TOPLEFT';
            if(text)
                this.text = text;
        },
        set:function(flags){
            if(flags["canvas"]){
                if(flags.canvas["position"]){
                    if(flags.canvas.position['x'])
                        this.canvasPositionX.set({value:flags.canvas.position.x});
                    if(flags.canvas.position['y'])
                        this.canvasPositionY.set({value:flags.canvas.position.y});
                    if(flags.canvas.position['type']){
                        this.canvasPositionX.set({gradient:{type:flags.canvas.position.type}});
                        this.canvasPositionY.set({gradient:{type:flags.canvas.position.type}});
                    }
                    if(flags.canvas.position['interval']){
                        this.canvasPositionX.set({gradient:{interval:flags.canvas.position.interval}});
                        this.canvasPositionY.set({gradient:{interval:flags.canvas.position.interval}});
                    }
                }
                if(flags.canvas["tolerance"]){
                    this.canvasPositionY.set({gradient:{tolerance:flags.canvas.tolerance}});
                    this.canvasPositionX.set({gradient:{tolerance:flags.canvas.tolerance}});
                }
                if(flags.canvas["attachment"])
                    this.attachment = flags.canvas.attachment;
                if(flags.canvas["size"]){
                    if(flags.canvas.size['x'])
                        this.canvasSizeX.set({value:flags.canvas.size.x});
                    if(flags.canvas.size['y'])
                        this.canvasSizeY.set({value:flags.canvas.size.y});
                }
                if(flags["text"]){
                    this.text = flags.text;
                }
                if(flags["font"]){
                    if(flags.font['family'])
                        this.font = flags.font.family;
                    if(flags.font['size'])
                        this.size = flags.font.size;
                }
            }
        },
        slots:{
            draw:function(canvas){
                canvas.font = this.size + ' ' + this.font;
                var repositionedX=this.canvasPositionX.getValue(), repositionedY=this.canvasPositionY.getValue();
                if(this.attachment == 'CENTER'){
                    var measurement = canvas.measureText(this.text);
                    repositionedX -= measurement.width/2;
                    repositionedY -= measurement.height/2;
                }
                canvas.fillText(this.text, repositionedX, repositionedY);
            },
            update:function(){
                this.emit('updateVariables');
            }
        }
    });
});
