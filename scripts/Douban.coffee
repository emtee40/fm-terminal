class JsonObject
        constructor: (@json) ->
                for key, value of json
                        @[key] = value
                

class Channel extends JsonObject
        songs: () ->
                window.DoubanFM?.doGetSongs(@)
        
class Song extends JsonObject
        like: () ->
                window.DoubanFM?.doLike(@)

        unlike: () ->
                window.DoubanFM?.doUnlike(@)
                
        boo: () ->
                window.DoubanFM?.doBoo(@)
                
        skip: () ->
                window.DoubanFM?.doSkip(@)

class User extends JsonObject
        attachAuth: (data) ->
                data["user_id"] = @user_id if @user_id?
                data["token"] = @token if @token?
                data["expire"] = @expire if @expire?
        
class Service
        constructor: (@proxy) ->

        get: (url, data, succ, err) ->


        post: (url, data, succ, err) ->



class DoubanFM
        app_name = "radio_desktop_win"
        version = 100
        domain = "http://www.douban.com"
        login_url = "/j/app/login"
        channel_url = "/j/app/radio/channels"
        song_url = "/j/app/radio/people"

        attachVersion: (data) ->
                data["app_name"] = app_name
                data["version"] = version
        
        constructor: (@service) ->
                window.DoubanFM ?= @
                @resume()
                
        resume: () ->
                #TODO: read cookie to @user

        remember: () ->
                #TODO: write cookie from @user
                
        forget: () ->
                #TODO: clear cookie

        post_login: (data, remember, succ, err) ->
                @user = new User(data)
                if (@user.r == 1)
                        err(@user)
                        return
                if (remember)
                        @remember
                succ(@user)
                
        login: (email, password, remember, succ, err) ->
                payload =
                {
                        "email": email,
                        "password": password,
                }
                @attachVersion(payload)
                @service.post(
                        domain + login_url,
                        payload,
                        ((data) =>
                                @post_login(data, remember, succ, err)
                        ),
                        (() =>
                                data = { r: 1, err: "Internal Error" }
                                @post_login(data, remember, succ, err)
                        ))
                return
                
        logout: () ->
                @User = new User()
                @forget()

        #######################################
        # 
        channels: () ->
                return doGetChannels()

        #######################################
        doGetChannels: ()->
                #TODO:
                
        doGetSongs: (channel)->
                #TODO:

        #######################################
        doLike: (song) ->
                #TODO:

        doUnlike: (song) ->
                #TODO:
                
        doBoo: (song) ->
                #TODO:

        doSkip: (song) ->
                #TODO:
