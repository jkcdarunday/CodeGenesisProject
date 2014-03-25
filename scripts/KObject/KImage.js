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
                this.targetPositionX =
                this.targetPositionY =
                this.canvasPositionX =
                this.canvasPositionY = 0;
            this.attachment = "TOPLEFT";
            if(KIMAGES[imageSet] != undefined)
                this.setSize(KIMAGES[imageSet].width,KIMAGES[imageSet].height);
            this.animationType = 'EASE';
            this.animationInterval = 18;
            this.alpha = 1.0;
            this.targetAlpha = 1.0;
        },
        set: function(flags){
            if(flags['size'])
                this.setSize(flags.size.x, flags.size.y);

            if(flags['fade']){
                if(flags.fade['type'])
                    this.fadeType = flags.fade.type;
                if(flags.fade['interval'])
                    this.fadeInterval = flags.fade.interval;
            }

            if(flags['opacity'])
                this.setOpacity(flags.opacity);

            if(flags['type'])
                this.setType(flags.type);

            if(flags['blockSize'])
                this.setBlockSize(flags.blockSize);

            if(flags['position']){
                if(flags.position['image'])
                    this.setImagePosition(flags.position.image.x, flags.position.image.y);
                if(flags.position['target'])
                    this.setTargetPosition(flags.position.target.x, flags.position.target.y);
                if(flags.position['attachment'])
                    this.attachment = flags.position.attachment;
            }

            if(flags['animation']){
                if(flags.animation['type'])
                    this.animationType = flags.animation.type;
                if(flags.animation['interval'])
                    this.animationInterval = flags.animation.interval;
            }

        },
        setOpacity: function(opacity){
            this.targetAlpha = opacity;
        },
        setFade: function(fade, interval){
            this.fadeType = fade;
            if(interval != undefined){
                this.fadeInterval = interval;
            } else {
                if(this.fadeType == 'EASE')
                    this.fadeInterval = 18;
                else if(this.fadeType == 'LINEAR')
                    this.fadeInterval = .05;
            }
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
            this.canvasSizeX = x;
            this.canvasSizeY = y;
        },
        setCanvasSize: function(x,y){
            this.canvasSizeX = x;
            this.canvasSizeY = y;
        },
        setTargetPosition: function(x,y){
            this.targetPositionX = x;
            this.targetPositionY = y;
        },
        setAnimationType: function(atype, interval){
            this.animationType = atype;
            if(interval != undefined){
                this.animationInterval = interval;
            } else {
                if(this.animationType == 'EASE')
                    this.animationInterval = 6;
                else if(this.animationType == 'LINEAR')
                    this.animationInterval = 5;
            }
        },
        slots:{
            draw: function(canvas){
                canvas.globalAlpha = this.alpha;
                var canvasRepositionedX = this.canvasPositionX
                var canvasRepositionedY = this.canvasPositionY;
                if(this.attachment == "CENTER"){
                    canvasRepositionedX -= this.canvasSizeX/2;
                    canvasRepositionedY -= this.canvasSizeY/2;
                }
                if(this.type == 'BLOCK'){
                    canvas.drawImage(
                        KIMAGES[this.imageSet],
                        this.imagePositionX*this.blockX,
                        this.imagePositionY*this.blockY,
                        this.sizeX,
                        this.sizeY,
                        canvasRepositionedX,
                        canvasRepositionedY,
                        this.canvasSizeX,
                        this.canvasSizeY
                    );
                } else if(this.type == 'NORMAL'){
                    canvas.drawImage(
                        KIMAGES[this.imageSet],
                        this.imagePositionX,
                        this.imagePositionY,
                        this.sizeX,
                        this.sizeY,
                        canvasRepositionedX,
                        canvasRepositionedY,
                        this.canvasSizeX,
                        this.canvasSizeY
                    );
                }
                canvas.globalAlpha = 1.0;
            },
            update: function(){
                var xUnequal = false, yUnequal = false, yNowEqual = false, xNowEqual = false;
                if(xUnequal = this.targetPositionX != this.canvasPositionX){
                    var deltaX = this.targetPositionX-this.canvasPositionX;
                    if(this.animationType == 'IMMEDIATE'){
                        this.canvasPositionX = this.targetPositionX;
                    }else if(this.animationType == 'LINEAR'){
                        if(this.targetPositionX < this.canvasPositionX)
                            this.canvasPositionX-=this.animationInterval;
                        else
                            this.canvasPositionX+=this.animationInterval;
                    }else if (this.animationType == 'EASE'){
                        this.canvasPositionX += deltaX/this.animationInterval;
                    }
                    if(Math.abs(deltaX) < this.animationInterval)
                        this.canvasPositionX = this.targetPositionX;
                }
                if(yUnequal = this.targetPositionY != this.canvasPositionY){
                    var deltaY = this.targetPositionY-this.canvasPositionY;
                    if(this.animationType == 'IMMEDIATE'){
                        this.canvasPositionY = this.targetPositionY;
                    }else if(this.animationType == 'LINEAR'){
                        if(this.targetPositionY < this.canvasPositionY)
                            this.canvasPositionY-=this.animationInterval;
                        else
                            this.canvasPositionY+=this.animationInterval;
                    } else if (this.animationType == 'EASE'){
                        this.canvasPositionY += deltaY/this.animationInterval;
                    }
                    if(Math.abs(deltaY) < this.animationInterval)
                        this.canvasPositionY = this.targetPositionY;
                }
                yNowEqual = this.targetPositionY == this.canvasPositionY;
                xNowEqual = this.targetPositionX == this.canvasPositionX;
                if(xUnequal && xNowEqual || yUnequal && yNowEqual) this.emit('inPosition');

                if(this.alpha != this.targetAlpha){
                    var fadeDelta = this.targetAlpha-this.alpha;
                    if(this.fadeType == 'IMMEDIATE'){
                        this.alpha = this.targetAlpha;
                    }else if(this.fadeType == 'LINEAR'){
                        if(this.targetAlpha < this.alpha)
                            this.alpha -= this.fadeInterval;
                        else
                            this.alpha += this.fadeInterval;
                    } else if (this.fadeType == 'EASE'){
                        this.alpha += fadeDelta/this.fadeInterval;
                    }
                    if(Math.abs(fadeDelta) < this.fadeInterval)
                        this.alpha = this.targetAlpha;
                }
            }
        }
    });
});
