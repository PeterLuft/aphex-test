//js file for aphex loop test



$(document).ready(function(){
        
    var numPlayers = 0;
    var players = [];

    $('#loadSound').click(function(){
        //this listener will eventually get replaced with loading new sounds from the server
        //create a new player object
        var player = new Player({
            id: numPlayers,
            title: 'Good track #' + (numPlayers + 1),
            file: 'cool_tune_' + numPlayers + '.m4a',
            howl: null
        });
        player.loadPlayer();
        players.push(player);
        numPlayers++;
    });  
    
    $(document).on('click', '.playButton', function(){
        var parent = $(this).parent().attr('id');
        var id = parseInt(parent.substring(parent.indexOf('_') + 1));
        players[id].togglePlay();
    });
    
    $(document).on('click', '.muteButton', function(){
        var parent = $(this).parent().attr('id');
        var id = parseInt(parent.substring(parent.indexOf('_') + 1));
        players[id].toggleMute();
    });
    
    $(document).on('click', '.loopButton', function(){
       var parent = $(this).parent().attr('id');
        var id = parseInt(parent.substring(parent.indexOf('_') + 1));
        players[id].toggleLoop();
    });
    
});

var Player = function(data){
    
    //player object is created, load it up with its sound
    this.data = data;
    this.data.howl = new Howl({src: ['./audio/' + data.file], html5: true, loop: false});
}

Player.prototype = {
    
    //add functions
    
    togglePlay:function(){
        var self = this;
        var sound = self.data.howl;
        
        if(sound.playing()){
            sound.pause();
        }
        else{
            sound.play();
        }
    },
    
    toggleLoop: function(){
        var self = this;
        var sound = self.data.howl;
                
        if(sound.loop() == true){
            sound.loop(false);
        }
        else{
            sound.loop(true);
        }  
    },
    
    toggleMute: function(){
        var self = this;
        var sound = self.data.howl;
        
        if(sound.mute() == true){
            sound.mute(false);
        }
        else{
            sound.mute(true);
        }
    },
    
    
    play: function(){
        var self = this;
        var sound;
        var data = self.data;

        //set up and load a new howl
        if(data.howl){
            sound = data.howl;
            sound.play();
        }
    },

    pause: function(){
        var self = this;
        var sound = self.data.howl;
        sound.pause();

        //set the status indicator

    },

    skip: function(direction){
        //probably not a necessary method but we'll include it here anyway
        //devoid of a playlist context, not much we can do here
    },

    volume: function(val){
        var self = this;
        //unimplemented for now
        
    },

    seek: function(per){
        //unimplemented for now
    },

    step: function(){
        //this may be devoid of context as of now
        //unimplemented for now
    },
    
    
    
    
    loadPlayer: function(){
        var self= this;
        
        var content =
            "<li id= 'sound_" + this.data.id + "'>"+
            "<h2>" + this.data.title + "</h2>" +
            "<button type='button' class='btn-primary playButton'>Play/Pause</button><br>" + 
            "<button type='button' class='btn-primary muteButton'>Mute/Unmute</button><br>" + 
            "<button type='button' class='btn-primary loopButton'>Loop/Unloop</button>" + 
            "</li>";
        $('#playersList').append(content);
        
    },

    formatTime: function(secs){
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = (secs - minutes * 60) || 0;
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
};






 

