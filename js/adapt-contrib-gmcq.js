define(function(require) {
    var Mcq = require('components/adapt-contrib-mcq/js/adapt-contrib-mcq');
    var Adapt = require('coreJS/adapt');

    var Gmcq = Mcq.extend({

        
    });
    
    Adapt.register("Gmcq", Gmcq);

    return Gmcq;
    
});
