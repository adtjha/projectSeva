## Channel - Firestore

    channel {
        createdAt,
        userId,
        id,
        imgUrl,
        type,
        description,
        keywords [],
        pricing,
        ratings [
            {
                name,
                img,
                text,
                score,
            }
        ],
        total,
        users,
        activity {
            roomCreated,
            roomDeleted,
            usersInteracted,
        },
    }


## IdsHaveSpace
```
    channel {
        id,
        rooms [
            {
                roomId []
            }
        ],
    }
```

## User - Firestore
```
    user {
        authProvider,
        email,
        name,
        uid,
        type,
    }
```

## Room - Redis
```
    rooom {
        id,
        channelId,
        users [],
        userCount,
        game {
            colors [],
            dice,
            chance,
        },
        createdAt,
    }
```