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
        init: function(imageSet){
            this.constructor.super.call(this);
            this.imageSet = imageSet;
            this.blockX = this.blockY = 0;
            this.type = 'NORMAL';
            this.imagePositionX = new KSmoothVariable({value:0}, this);
            this.imagePositionY = new KSmoothVariable({value:0}, this);
            this.canvasPositionX = new KSmoothVariable({value:0}, this);
            this.canvasPositionY = new KSmoothVariable({value:0}, this);
            this.canvasSizeX = new KSmoothVariable({value:0}, this);
            this.canvasSizeY = new KSmoothVariable({value:0}, this);
            this.imageSizeX = new KSmoothVariable({value:0}, this);
            this.imageSizeY = new KSmoothVariable({value:0}, this);
            this.canvasPositionX.set({pair:this.canvasPositionY});
            this.canvasPositionY.set({pair:this.canvasPositionX});
            this.alpha = new KSmoothVariable({actualValue:1.0,value:1.0,gradient:{type:'EASE'}}, this);
            if(KIMAGES[imageSet] != undefined){
                this.setSize(KIMAGES[imageSet].width,KIMAGES[imageSet].height);
            }
            this.attachment = "TOPLEFT";
            this.emit('updateVariables');
        },
        set: function(flags){
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
            }
            if(flags["image"]){
                if(flags.image["position"]){
                    if(flags.image.position['x'])
                        this.imagePositionX.set({value:flags.image.position.x});
                    if(flags.image.position['y'])
                        this.imagePositionY.set({value:flags.image.position.y});
                    if(flags.image.position['type']){
                        this.imagePositionX.set({gradient:{type:flags.image.position.type}});
                        this.imagePositionY.set({gradient:{type:flags.image.position.type}});
                    }
                    if(flags.image.position['interval']){
                        this.imagePositionX.set({gradient:{interval:flags.image.position.interval}});
                        this.imagePositionY.set({gradient:{interval:flags.image.position.interval}});
                    }
                }
                if(flags.image["size"]){
                    if(flags.image.size['x'])
                        this.imageSizeX.set({value:flags.image.size.x});
                    if(flags.image.size['y'])
                        this.imageSizeY.set({value:flags.image.size.y});
                }
            }
            if(flags["opacity"]){
                this.alpha.set({value:flags.opacity});
            }
            if(flags["fade"]){
                if(flags.fade["tolerance"]){
                    this.alpha.set({gradient:{tolerance:flags.fade.tolerance}});
                }
                this.alpha.set({gradient:{type:flags.fade['type'],interval:flags.fade['interval']}});
            }
        },
        setCanvasSize: function(x,y){
            this.canvasSizeX.set({value:x});
            this.canvasSizeY.set({value:y});
        },
        setImageSize: function(x,y){
            this.imageSizeX.set({value:x});
            this.imageSizeY.set({value:y});
        },
        setSize: function(x,y){
            this.setCanvasSize(x,y);
            this.setImageSize(x,y);
        },
        slots:{
            draw: function(canvas){
                canvas.globalAlpha = this.alpha.getValue();
                var canvasRepositionedX = this.canvasPositionX.getValue();
                var canvasRepositionedY = this.canvasPositionY.getValue();
                if(this.attachment == "CENTER"){
                    canvasRepositionedX -= this.canvasSizeX.getValue()/2;
                    canvasRepositionedY -= this.canvasSizeY.getValue()/2;
                }
                if(this.type == 'BLOCK'){
                    canvas.drawImage(
                        KIMAGES[this.imageSet],
                        this.imagePositionX.getValue()*this.blockX,
                        this.imagePositionY.getValue()*this.blockY,
                        this.imageSizeX.getValue(),
                        this.imageSizeY.getValue(),
                        canvasRepositionedX,
                        canvasRepositionedY,
                        this.canvasSizeX.getValue(),
                        this.canvasSizeY.getValue()
                    );
                } else if(this.type == 'NORMAL'){
//                     console.log(this.canvasSizeX.getValue());
//                     console.log(this.canvasSizeY.getValue());
                    canvas.drawImage(
                        KIMAGES[this.imageSet],
                        this.imagePositionX.getValue(),
                        this.imagePositionY.getValue(),
                        this.imageSizeX.getValue(),
                        this.imageSizeY.getValue(),
                        canvasRepositionedX,
                        canvasRepositionedY,
                        this.canvasSizeX.getValue(),
                        this.canvasSizeY.getValue()
                    );
                }
                canvas.globalAlpha = 1.0;
            },
            update: function(){
                var isUnequal = !this.canvasPositionX.isEqual || !this.canvasPositionY.isEqual;
                this.emit('updateVariables');
                var isEqual = this.canvasPositionX.isEqual && this.canvasPositionY.isEqual;
                if(isUnequal && isEqual) this.emit('inPosition');
            }
        }
    });
});
