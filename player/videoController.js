/**
 * Created by galov on 02.05.2016.
 */
angular.module('player')
    .controller('HomeCtrl',
        function (VideoService, $scope) {

            $scope.API = null;
            $scope.currentVideo = 0;

            $scope.onPlayerReady = function (API) {
                $scope.API = API;
            };

            $scope.onCompleteVideo = function () {
                $scope.isCompleted = true;
                $scope.currentVideo++;
                if ($scope.currentVideo >= $scope.videos.length) $scope.currentVideo = 0;
                $scope.setVideo($scope.currentVideo);
            };

            $scope.setVideo = function (id) {
                $scope.API.stop();
                $scope.currentVideo = id;
                $scope.config.sources = $scope.videos[id].sources;
                $scope.config.plugins.poster = $scope.videos[id].images.placeholder;

            };

            VideoService.getVideoList().success(function (data) {
                $scope.videos = data;
                $scope.config = {
                    preload: "none",
                    autoHide: false,
                    autoHideTime: 3000,
                    autoPlay: false,
                    sources: $scope.videos[0].sources,
                    theme: {
                        url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                    },
                    plugins: {
                        poster: $scope.videos[0].images.placeholder
                    }
                };
            })


        }
    );