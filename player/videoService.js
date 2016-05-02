/**
 * Created by galov on 02.05.2016.
 */
'use strict';
angular.module('player')

    .service('VideoService', function ($http) {

        return {
            getVideoList: getVideoList
        }

        function getVideoList() {
            return $http.get('movies.json')
        }


    })
;