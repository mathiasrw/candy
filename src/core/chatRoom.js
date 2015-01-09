/** File: chatRoom.js
 * Candy - Chats are not dead yet.
 *
 * Authors:
 *   - Patrick Stadler <patrick.stadler@gmail.com>
 *   - Michael Weibel <michael.weibel@gmail.com>
 *
 * Copyright:
 *   (c) 2011 Amiado Group AG. All rights reserved.
 *   (c) 2012-2014 Patrick Stadler & Michael Weibel. All rights reserved.
 */
'use strict';

/* global Candy, Strophe */

/** Class: Candy.Core.ChatRoom
 * Candy Chat Room
 *
 * Parameters:
 *   (String) roomJid - Room jid
 */
Candy.Core.ChatRoom = function(options) {
	/** Object: room
	 * (String) jid
	 * (String) name
	 * (String) type (chat|groupchat)
	 * (String) topic
	 * (Integer) messageCount
	 */
	this.room = {
		jid: options.roomJid,
		name: options.roomName || Strophe.getNodeFromJid(options.roomJid),
		type: options.roomType,
		topic: null,
		messageCount: 0
	};

	/** Variable: user
	 * Current local user of this room.
	 */
	this.user = null;

	/** Variable: Roster
	 * Candy.Core.ChatRoster instance
	 */
	this.roster = new Candy.Core.ChatRoster();

	// DOM-related information for this room.
	this.dom = {
		id: options.domId,
		scrollPosition: options.scrollPosition || -1,
		tab: null,
		form: null
	}
};

Candy.Core.ChatRoom.prototype.setTopic = function(topic) {
	this.room.topic = topic;
};

Candy.Core.ChatRoom.prototype.getType = function() {
	return this.room.type;
};

Candy.Core.ChatRoom.prototype.incrementMessageCount = function() {
	this.room.messageCount += 1;
	return this.room.messageCount;
};

Candy.Core.ChatRoom.prototype.getUserCount = function() {
	return Object.keys(this.roster.items).length;
};

Candy.Core.ChatRoom.prototype.getDomElement = function() {
	return self.Room.getPane(this.room.jid);
};

Candy.Core.ChatRoom.prototype.getDomTab = function() {
	return self.Chat.getTab(roomJid);
};

Candy.Core.ChatRoom.prototype.getDomForm = function() {
	return self.Room.getPane(roomJid, '.message-form');
};

Candy.Core.ChatRoom.prototype.addRoomDom = function(chatRoomContainerSelector) {
	$(chatRoomContainerSelector).append(Mustache.to_html(Candy.View.Template.Room.pane, {
    roomId: self.dom.id,
    roomJid: self.room.jid,
    roomType: self.room.type,
    form: {
      _messageSubmit: $.i18n._('messageSubmit')
    },
    roster: {
      _userOnline: $.i18n._('userOnline')
    }
  }, {
    roster: Candy.View.Template.Roster.pane,
    messages: Candy.View.Template.Message.pane,
    form: Candy.View.Template.Room.form
  }));

  self.Chat.addTab(roomJid, roomName, roomType);
  self.Room.getPane(roomJid, '.message-form').submit(self.Message.submit);

  return this.getDomElement();
};

/** Function: setUser
 * Set user of this room.
 *
 * Parameters:
 *   (Candy.Core.ChatUser) user - Chat user
 */
Candy.Core.ChatRoom.prototype.setUser = function(user) {
	this.user = user;
};

/** Function: getUser
 * Get current local user
 *
 * Returns:
 *   (Object) - Candy.Core.ChatUser instance or null
 */
Candy.Core.ChatRoom.prototype.getUser = function() {
	return this.user;
};

/** Function: getJid
 * Get room jid
 *
 * Returns:
 *   (String) - Room jid
 */
Candy.Core.ChatRoom.prototype.getJid = function() {
	return this.room.jid;
};

/** Function: setName
 * Set room name
 *
 * Parameters:
 *   (String) name - Room name
 */
Candy.Core.ChatRoom.prototype.setName = function(name) {
	this.room.name = name;
};

/** Function: getName
 * Get room name
 *
 * Returns:
 *   (String) - Room name
 */
Candy.Core.ChatRoom.prototype.getName = function() {
	return this.room.name;
};

/** Function: setRoster
 * Set roster of room
 *
 * Parameters:
 *   (Candy.Core.ChatRoster) roster - Chat roster
 */
Candy.Core.ChatRoom.prototype.setRoster = function(roster) {
	this.roster = roster;
};

/** Function: getRoster
 * Get roster
 *
 * Returns
 *   (Candy.Core.ChatRoster) - instance
 */
Candy.Core.ChatRoom.prototype.getRoster = function() {
	return this.roster;
};
