PHONY: github pudding

github:
	rm -rf docs
	cp -r build docs
	touch docs/.nojekyll
	git add -A
	git commit -m "update github pages"
	git push
	
aws-sync:
	aws s3 sync build s3://pudding.cool/2025/03/housewives --delete --cache-control 'max-age=31536000'

aws-cache:
	aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths '/2025/03/housewives*'	

pudding: aws-sync aws-cache