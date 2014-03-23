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

define(["KThread", "KBase"],function(KThread, K){
    var m = new KThread(function(){
            this.docbody[0].innerHTML += "Test";
        },
        1000
    );
    m.docbody = K("body");
    m.start();
});
