PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      // var selectedPlayer = Session.get('selectedPlayer');
      // console.log(selectedPlayer);
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    }
  });
  Template.addPlayerForm.events({
    'submit form': function(){
      console.log("Form submitted");
    }
  });
  Template.leaderboard.helpers({
    'player': function(){
     return PlayersList.find({}, {sort: {score: -1, name: 1} })
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
        return "selected"
      }
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer)
    }
  });

}

if(Meteor.isServer){
  console.log("Hello, Server");
}
