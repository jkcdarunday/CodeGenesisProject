require.config({
    paths: {
        "KThread": "KObject/KThread",
        "KObject": "KObject/KObject",
        "KBase": "KObject/KBase",
        "KCanvas": "KObject/KCanvas",
        "KImage": "KObject/KImage",
        "KScene": "KObject/KScene"
    }
});

define(["KObject", "KThread", "KCanvas", "KScene", "KImage", "KBase"],function(KObject, KThread, KCanvas, KScene, KImage, K){
    var m = new KThread(function(){
            this.docbody[0].innerHTML += "Test";
        },
        1000
    );
    m.docbody = K("body");
//     m.start();

    var cc = new KCanvas('#leCanvas', true);
    var cs = new KScene();
    var heximg = new KImage('hexagon');
    heximg.setType('NORMAL');
    heximg.setSize(100, 115);
    heximg.setImagePosition(0,0);
    heximg.setCanvasPosition(0,0);
    heximg.setAnimationType("EASE");
    KObject.connect(cs, 'update', heximg, 'update');
    KObject.connect(cs, 'draw', heximg, 'draw');
    cc.scene = cs;
    cc.setFrameRate(60);
    cc.start();
    heximg.setTargetPosition(200,200);
});
