import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {APIProvider, AdvancedMarker, InfoWindow, Map, useAdvancedMarkerRef, useMap } from '@vis.gl/react-google-maps';
import { db } from "./utils/firebase";
import { ref, onValue, set } from "firebase/database";

import "./App.css";

const App = () => {
    const [quests, setQuests] = useState([]);


    useEffect(() => {
        const query = ref(db, "quests");
        
        onValue(query, (snapshot) => {
            const data = snapshot.val();
            if ( data !== null ) {
                setQuests(data);
                
            } else {
                setQuests([]);
            }
        });
    }, []);

    const handleDoubleClick = (event) => {
        set(ref(db, 'quests/' + quests.length), {
            position: event.detail.latLng,
            timestamp: Date.now()
          });
    };

    const updateQuestPosition = (event, id) => {
        set(ref(db, 'quests/' + id), {
            position: event.latLng.toJSON(),
            timestamp: Date.now()
        });
    };

    const deleteQuest = (id) => {
        set(ref(db, 'quests/' + id), null);
    };

    const deleteAllQuests = () => {
        set(ref(db, 'quests/'), null);
    };

    const listQuests = quests.map((quest, i) => (<div key={i}>
        <div className="quest-header">
            <h4>Quest {i + 1}</h4>
            <button onClick={() => (deleteQuest(i))}>Delete</button>
        </div>
        <h4>Position:</h4>
        <p>Lat: {quest.position.lat} Lng: {quest.position.lng}</p>
    </div>));
    
    return (
        <>
            { quests.length !== 0 && <div className="list-quests">
                <button onClick={deleteAllQuests}>Clear quest list</button>
                {listQuests}
            </div>}
            
            <APIProvider apiKey="AIzaSyAksCP6ldUr4DXKedtmOMVD2sftICh7OlY">
                <Map
                mapId={"bf51a910020fa25a"}
                defaultZoom={13}
                defaultCenter={{ lat: 49.8358, lng: 24.0193 }}
                gestureHandling={"greedy"}
                disableDefaultUI
                disableDoubleClickZoom
                onDblclick={handleDoubleClick}
                >
                    {quests.map((quest, i) => (
                        <AdvancedMarker key={i} draggable={true} position={quest.position} onDragEnd={(event) => (updateQuestPosition(event, i))}>
                            <div className="marker-text">
                                <h1>{i + 1}</h1>
                            </div>
                        </AdvancedMarker>
                    ))}
                </Map>
            </APIProvider>
        </>
    );
};


export default App;