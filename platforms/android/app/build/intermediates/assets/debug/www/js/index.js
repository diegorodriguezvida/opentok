/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
      
        var publisher = OT.initPublisher('publisher');
        var session = OT.initSession(apiKey, sessionId);
        
        function createSubscriber(stream, streamId) {
          var subscriberClassName = `subscriber-${streamId}`;
          var subscriber = document.createElement('div');
          subscriber.setAttribute('id', subscriberClassName);
          document.getElementById('subscribers').appendChild(subscriber);
          session.subscribe(stream, subscriberClassName);
        }
        
        session.on({
          streamCreated: function(event) {
            createSubscriber(event.stream, event.stream.streamId);
          },
          streamDestroyed: function(event) {
            console.log(`Stream ${event.stream.name} ended because ${event.reason}.`);
          },
          sessionConnected: function(event) {
            session.publish(publisher);
          }
        });
        
        session.connect(token, function(error) {
          if (error) {
            console.log(`There was an error connecting to the session: ${error}`);
          }
        });
        
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
    }
};

app.initialize();
