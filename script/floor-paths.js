const APItoLayoutMap = {
    "11505" : {
        "publicName": "Gym", 
        "layoutName": "cab-5-place"
    },
    "6070" : {
        "publicName": "Cloakroom", 
        "layoutName": "cab-6-place"
    },
    "10861" : {
        "publicName": "Conference", 
        "layoutName": "cab-10-place"
    },
    "12143" : {
        "publicName": "bookkeepering", 
        "layoutName": "cab-12-place"
    },
    "7665" : {
        "publicName": "Denis", 
        "layoutName": "cab-14-place"
    },
    "12462" : {
        "publicName": "Vepp 2", 
        "layoutName": "cab-15-place"
    },
    "5751" : {
        "publicName": "Vepp 1", 
        "layoutName": "cab-16-place"
    },
    "25956" : {
        "publicName": "4 этаж вход", 
        "layoutName": "cab-1-8-place"
    },
    "26108" : {
        "publicName": "4 этаж выход", 
        "layoutName": "cab-1-8-place"
    },
    "134877" : {
        "publicName": "выход совсем", 
        "layoutName": "cab-17-place"// уходит вникуда----------------------------------------------
    },
    "134418" : {
        "publicName": "Boss", 
        "layoutName": "cab-37-place"
    },
    "148898" : {
        "publicName": "этаж 5 вход", 
        "layoutName": "cab-17-place"
    },
    "149051" : {
        "publicName": "этаж 5 выход", 
        "layoutName": "cab-17-place"
    },
    "7027" : {
        "publicName": "Каб 25 (BDSM)", 
        "layoutName": "cab-25-place"
    },
    "9260" : {
        "publicName": "Каб 26 (Support)", 
        "layoutName": "cab-25-place"
    },
    "9579" : {
        "publicName": "Каб 27 (BILLmanager big)", 
        "layoutName": "cab-27-place"
    },
    "33755" : {
        "publicName": "Каб 28 (BILLmanager small)", 
        "layoutName": "cab-28-place"
    },
    "8622" : {
        "publicName": "Каб 29 (DevOps)", 
        "layoutName": "cab-29-place"
    },
    "34080" : {
        "publicName": "Каб 33.1 (Design)", 
        "layoutName": "cab-33-place"
    },
    "10542" : {
        "publicName": "Каб 35 (Greed)", 
        "layoutName": "cab-35-place"
    },
    "9898" : {
        "publicName": "Каб 36 (Olga)", 
        "layoutName": "cab-36-place"
    },
    "7346" : {
        "publicName": "Каб 37 (SEO)", 
        "layoutName": "cab-37-place"
    },
    "11180" : {
        "publicName": "Каб 38 (English)", 
        "layoutName": "cab-38-place"
    },
    "5113" : {
        "publicName": "Каб 39 (Talk склад)", 
        "layoutName": "cab-39-place"
    },
    "5432" : {
        "publicName": "Каб 40 (VMmanager)", 
        "layoutName": "cab-40-place"
    },
    "6389" : {
        "publicName": "Каб 41 (Cartbee)", 
        "layoutName": "cab-41-place"
    },
    "6708" : {
        "publicName": "Каб 42 (Talk)", 
        "layoutName": "cab-42-place"
    },
    "10217" : {
        "publicName": "Каб 43 (DCI)", 
        "layoutName": "cab-43-place"
    }
};

const roomMap = {
    "1-0": {
        name: "коридор 1",
        routes: ["1-1", "9", "12-1", "15"]
    },
    "1-1": {
        name: "коридор 1",
        routes: ["1-0", "1-2"]
    },
    "1-2": {
        name: "коридор 1",
        routes: ["1-1", "1-3", "10-1"]
    },
    "1-3": {
        name: "коридор 1",
        routes: ["5-0", "1-4", "1-2"]
    },
    "1-4": {
        name: "коридор 1",
        routes: ["16", "8", "1-3", "1-5"]
    },
    "1-5": {
        name: "коридор 1",
        routes: ["6", "1-6", "1-4"]
    },
    "1-6": {
        name: "коридор 1",
        routes: ["3", "1-7", "1-5"]
    },
    "1-7": {
        name: "коридор 1",
        routes: ["4", "1-6", "1-8"]
    },
    "1-8": {
        name: "коридор 1",
        routes: ["2-1", "1-7", "17"]
    },
    "2": {
        name: "туалет ж",
        routes: ["2-1"]
    },
    "2-1": {
        name: "коридор 2",
        routes: ["2", "1-8"]
    },
    "3": {
        name: "туалет м",
        routes: ["1-6"]
    },
    "4": {
        name: "туалет м",
        routes: ["1-7"]
    },
    "5": {
        name: "коридор 1",
        routes: ["5-0", "5-1"]
    },
    "5-0": {
        name: "коридор 1",
        routes: ["5", "1-3"]
    },
    "5-1": {
        name: "коридор 1",
        routes: ["5", "6", "7"]
    },
    "6": {
        name: "коридор 1",
        routes: ["1-5", "5-1"]
    },
    "7": {
        name: "коридор 1",
        routes: ["5-1"]
    },
    "8": {
        name: "коридор 1",
        routes: ["1-4"]
    },
    "9": {
        name: "коридор 1",
        routes: ["1-0"]
    },
    "10": {
        name: "коридор 1",
        routes: ["10-1"]
    },
    "10-1": {
        name: "коридор 1",
        routes: ["1-2", "10"]
    },
    "11": {
        name: "коридор 1",
        routes: ["12-1"]
    },
    "12": {
        name: "коридор 1",
        routes: ["12-2", "12-3", "12-4"]
    },
    "12-1": {
        name: "коридор 1",
        routes: ["11", "1-0", "12-2"]
    },
    "12-2": {
        name: "коридор 1",
        routes: ["14", "12-1", "12-4"]
    },
    "12-3": {
        name: "коридор 1",
        routes: ["12-4", "13"]
    },
    "12-4": {
        name: "коридор 1",
        routes: ["12-2", "12-3", "12"]
    },
    "13": {
        name: "коридор 1",
        routes: ["12-3"]
    },
    "14": {
        name: "коридор 1",
        routes: ["12-2"]
    },
    "15": {
        name: "коридор 1",
        routes: ["1-0"]
    },
    "16": {
        name: "коридор 1",
        routes: ["1-4"]
    },
    "17": {
        name: "коридор 1",
        routes: ["18-11", "1-8"]
    },
    "18-1": {
        name: "коридор 1",
        routes: ["26-1", "18-2"]
    },
    "18-2": {
        name: "коридор 1",
        routes: ["18-1", "18-3"]
    },
    "18-3": {
        name: "коридор 1",
        routes: ["18-2", "18-4", "27"]
    },
    "18-4": {
        name: "коридор 1",
        routes: ["18-3", "18-5", "25"]
    },
    "18-5": {
        name: "коридор 1",
        routes: ["18-4", "18-6", "24"]
    },
    "18-6": {
        name: "коридор 1",
        routes: ["18-5", "18-7", "23", "28"]
    },
    "18-7": {
        name: "коридор 1",
        routes: ["18-6", "18-8", "22"]
    },
    "18-8": {
        name: "коридор 1",
        routes: ["18-7", "18-9", "29"]
    },
    "18-9": {
        name: "коридор 1",
        routes: ["18-8", "18-10", "20"]
    },
    "18-10": {
        name: "коридор 1",
        routes: ["18-9", "18-11", "19"]
    },
    "18-11": {
        name: "коридор 1",
        routes: ["18-10", "18-12", "17"]
    },
    "18-12": {
        name: "коридор 1",
        routes: ["18-11", "18-13", "32"]
    },
    "18-13": {
        name: "коридор 1",
        routes: ["18-12", "18-14", "33"]
    },
    "18-14": {
        name: "коридор 1",
        routes: ["18-13", "18-15", "38"]
    },
    "18-15": {
        name: "коридор 1",
        routes: ["18-14", "18-16", "39"]
    },
    "18-16": {
        name: "коридор 1",
        routes: ["18-15", "18-17", "40", "34"]
    },
    "18-17": {
        name: "коридор 1",
        routes: ["18-16", "18-18", "41"]
    },
    "18-18": {
        name: "коридор 1",
        routes: ["18-17", "18-19", "42", "35"]
    },
    "18-19": {
        name: "коридор 1",
        routes: ["18-18", "18-20", "36"]
    },
    "18-20": {
        name: "коридор 1",
        routes: ["18-19", "18-16", "37", "43"]
    },
    "19": {
        name: "коридор 1",
        routes: ["18-10"]
    },
    "20": {
        name: "коридор 1",
        routes: ["18-9"]
    },
    /*"21": {
        name: "коридор 1",
        routes: ["18-11"]
    },*/
    "22": {
        name: "коридор 1",
        routes: ["18-7"]
    },
    "23": {
        name: "коридор 1",
        routes: ["18-6"]
    },
    "24": {
        name: "коридор 1",
        routes: ["18-5"]
    },
    "25": {
        name: "коридор 1",
        routes: ["18-4"]
    },
    "26": {
        name: "коридор 1",
        routes: ["26-1"]
    },
    "26-1": {
        name: "коридор 1",
        routes: ["18-1", "26"]
    },
    "27": {
        name: "коридор 1",
        routes: ["18-3"]
    },
    "28": {
        name: "коридор 1",
        routes: ["18-6"]
    },
    "29": {
        name: "коридор 1",
        routes: ["18-8"]
    },
    "31": {
        name: "коридор 1",
        routes: ["18-11", "18-10"]
    },
    "32": {
        name: "коридор 1",
        routes: ["18-12"]
    },
    "33": {
        name: "коридор 1",
        routes: ["18-13"]
    },
    "34": {
        name: "коридор 1",
        routes: ["18-16"]
    },
    "35": {
        name: "коридор 1",
        routes: ["18-18"]
    },
    "36": {
        name: "коридор 1",
        routes: ["18-19"]
    },
    "37": {
        name: "коридор 1",
        routes: ["18-20"]
    },
    "38": {
        name: "коридор 1",
        routes: ["18-14"]
    },
    "39": {
        name: "коридор 1",
        routes: ["18-15"]
    },
    "40": {
        name: "коридор 1",
        routes: ["18-16"]
    },
    "41": {
        name: "коридор 1",
        routes: ["18-17"]
    },
    "42": {
        name: "коридор 1",
        routes: ["18-18"]
    },
    "43": {
        name: "коридор 1",
        routes: ["18-20"]
    }
};

class FindShortRoute {
  constructor(roomMap) {
    this.roomMap = roomMap;
  }

  saveToCache(key, route) {
    if (!this.cache) {
      this.cache = {};
    }
    this.cache[key] = route;
  }

  findRoute(start, finish) {
    const key = `${start}---${finish}`;
    if (this.cache && this.cache[key]) {
      return this.cache[key];
    }
    const routes = this.findRoutes(start, finish);
    const shortRoute = routes.reduce((a, b) => (a.length <= b.length ? a : b));
    this.saveToCache(key, shortRoute);
    return shortRoute;
  }

  findRoutes(start, finish) {
    const maxLoopLength = 1000;
    let wrongFinishRoom = [];
    let candidateRoutes = [];
    let currentRoomId = start;
    let isFinding = true;
    let routes = [start];
    let i = 0;
    let candidateRoutesFlat = [];
    while (isFinding) {
      i++;
      let nextRoomId = this.getNextDoor(
        routes,
        currentRoomId,
        wrongFinishRoom,
        candidateRoutesFlat
      );
    //   console.log("next id", nextRoomId);
    //   console.log("current id", currentRoomId);
      if (nextRoomId !== null) {
        currentRoomId = nextRoomId;
        routes.push(nextRoomId);
        if (currentRoomId === finish) {
        //   console.log(
        //     JSON.stringify(routes),
        //     JSON.stringify(candidateRoutes[candidateRoutes.length - 1])
        //   );
          if (
            JSON.stringify(routes) ===
            JSON.stringify(candidateRoutes[candidateRoutes.length - 1])
          ) {
            isFinding = false;
            // console.log("exit repeat route");
          } else {
            candidateRoutes.push([...routes]);
            candidateRoutesFlat = candidateRoutes.flat();
            // console.log(
            //   "exit find finish room",
            //   routes,
            //   "---------------------------------------------"
            // );
            routes = [start];
            currentRoomId = start;
          }
        }
      } else {
        if (wrongFinishRoom.includes(currentRoomId)) {
        //   console.log("exist wrong", nextRoomId);
          isFinding = false;
        } else {
        //   console.log("next wrong", [...routes]);
          wrongFinishRoom.push(currentRoomId);
          routes.pop();
          currentRoomId = routes[routes.length - 1];
        }
      }
      if (i === maxLoopLength) {
        isFinding = false;
        // console.log("exit by max count");
      }
    }

    return candidateRoutes;
  }

  getNextDoor(routes, roomId, wrongFinishRoom, candidateRoutes) {
    // console.log("gnd", [...routes], "roomId", roomId);
    if(roomId == "1") {
        roomId = "1-8";
    }
    let room = roomMap[roomId];
    let nextRoom = null;
    let fromCandidate;
    // console.log("can flat", candidateRoutes);
    // console.log("room", roomId);
    
    room.routes.some((nextRoomId) => {
      if (
        !routes.includes(nextRoomId) &&
        !wrongFinishRoom.includes(nextRoomId)
      ) {
        if (candidateRoutes.includes(nextRoomId)) {
          fromCandidate = nextRoomId;
          return false;
        }
        nextRoom = nextRoomId;
        return true;
      }
    });
    if (nextRoom == null && fromCandidate) {
      return fromCandidate;
    }
    return nextRoom;
  }
}
