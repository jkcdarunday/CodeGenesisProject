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

define(['KObject'], function(KObject){
    return KObject.extend({
        init: function(imageSet){
            this.constructor.super.call(this);
            this.imageSet = imageSet;
            this.blockX =
                this.blockY =
                this.imagePositionX =
                this.imagePositionY =
                this.canvasPositionX =
                this.canvasPositionY = 0;
            if(KIMAGES[imageSet] != undefined)
                this.setSize(KIMAGES[imageSet].width,KIMAGES[imageSet].height);
            this.animationType = "EASE";
            this.alpha = 1.0;
        },
        setOpacity: function(opacity){
            this.alpha = opacity;
        },
        setType: function(type){
            this.type = type;
        },
        setBlockSize: function(x, y){
            this.blockX = x;
            if(y != undefined && y!=null) this.blockY = y;
            else this.blockY = x;
            this.sizeX = this.blockX;
            this.sizeY = this.blockY;
        },
        setImagePosition: function(x,y){
            this.imagePositionX = x;
            this.imagePositionY = y;
        },
        setCanvasPosition: function(x,y){
            this.canvasPositionX = x;
            this.canvasPositionY = y;
            this.targetPositionX = x;
            this.targetPositionY = y;
        },
        setSize: function(x,y){
            this.sizeX = x;
            this.sizeY = y;
        },
        setTargetPosition: function(x,y){
            this.targetPositionX = x;
            this.targetPositionY = y;
        },
        setAnimationType: function(atype){
            this.animationType = atype;
        },
        slots:{
            draw: function(canvas){
                canvas.globalAlpha = this.alpha;
                if(this.type == 'BLOCK'){
                    canvas.drawImage(
                        KIMAGES[this.imageSet],
                        this.imagePositionX*this.blockX,
                        this.imagePositionY*this.blockY,
                        this.sizeX,
                        this.sizeY,
                        this.canvasPositionX,
                        this.canvasPositionY,
                        this.sizeX,
                        this.sizeY
                    );
                } else if(this.type == 'NORMAL'){
                    canvas.drawImage(
                        KIMAGES[this.imageSet],
                        this.imagePositionX,
                        this.imagePositionY,
                        this.sizeX,
                        this.sizeY,
                        this.canvasPositionX,
                        this.canvasPositionY,
                        this.sizeX,
                        this.sizeY
                    );
                }
                canvas.globalAlpha = 1.0;
            },
            update: function(){
                var xUnequal = false, yUnequal = false, yNowEqual = false, xNowEqual = false;
                if(xUnequal = this.targetPositionX != this.canvasPositionX){
                    if(this.animationType == "IMMEDIATE"){
                        this.canvasPositionX = this.targetPositionX;
                    }else if(this.animationType == "LINEAR"){
                        if(this.targetPositionX < this.canvasPositionX)
                            this.canvasPositionX--;
                        else
                            this.canvasPositionX++;
                    }else if (this.animationType == "EASE"){
                        var delta = this.targetPositionX-this.canvasPositionX;
                        if(Math.abs(delta) < 3)
                            this.canvasPositionX = this.targetPositionX;
                        else this.canvasPositionX += delta/18;
                    }
                }
                if(yUnequal = this.targetPositionY != this.canvasPositionY){
                    if(this.animationType == "IMMEDIATE"){
                        this.canvasPositionY = this.targetPositionY;
                    }else if(this.animationType == "LINEAR"){
                        if(this.targetPositionY < this.canvasPositionY)
                            this.canvasPositionY--;
                        else
                            this.canvasPositionY++;
                    } else if (this.animationType == "EASE"){
                        var delta = this.targetPositionY-this.canvasPositionY;
                        if(Math.abs(delta) < 3)
                            this.canvasPositionY = this.targetPositionY;
                        else this.canvasPositionY += delta/18;
                    }
                }
                yNowEqual = this.targetPositionY == this.canvasPositionY;
                xNowEqual = this.targetPositionX == this.canvasPositionX;
                if(xUnequal && xNowEqual || yUnequal && yNowEqual) this.emit('inPosition');
            }
        }
    });
});
