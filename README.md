```bash
docker build -t sherlock-front:1.0.0 -f docker/Dockerfile.production --build-arg configuration=production . && \
docker tag sherlock-front:1.0.0 943635619664.dkr.ecr.eu-west-3.amazonaws.com/sherlock-front:1.0.0 && \
docker push 943635619664.dkr.ecr.eu-west-3.amazonaws.com/sherlock-front:1.0.0
```"# sherlock-front" 
