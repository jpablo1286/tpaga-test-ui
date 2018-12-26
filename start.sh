if [ "$1" == "dev" ];
then
  cp Dockerfile-dev Dockerfile
  sudo docker build -t tpaga-test-ui:latest ./
  sudo docker run --rm --name tpaga-test-ui -p 4200:4200 -v "$(pwd)"/src/:/app/my-project/src tpaga-test-ui:latest
else
  cp Dockerfile-prod Dockerfile
  sudo docker build -t tpaga-test-ui:latest ./
  sudo docker run --rm --name tpaga-test-ui -p 4200:4200 tpaga-test-ui:latest
fi
