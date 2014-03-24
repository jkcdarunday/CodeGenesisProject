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
            },
            update: function(){
                if(this.targetPositionX != this.canvasPositionX){
                    if(this.animationType == "LINEAR"){
                        if(this.targetPositionX < this.canvasPositionX)
                            this.canvasPositionX--;
                        else
                            this.canvasPositionX++;
                    }else if (this.animationType == "EASE"){
                        var delta = this.targetPositionX-this.canvasPositionX;
                        if(delta < 3) this.targetPositionX = this.canvasPositionX;
                        else this.canvasPositionX += delta/18;
                    }
                }
                if(this.targetPositionY != this.canvasPositionY){
                    if(this.animationType == "LINEAR"){
                        if(this.targetPositionY < this.canvasPositionY)
                            this.canvasPositionY--;
                        else
                            this.canvasPositionY++;
                    } else if (this.animationType == "EASE"){
                        var delta = this.targetPositionY-this.canvasPositionY;
                        if(delta < 3) this.targetPositionY = this.canvasPositionY;
                          else this.canvasPositionY += delta/18;
                    }
                }
            }
        }
    });
});
