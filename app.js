(function(Aurora){
	var ATA = Aurora();
	ATA.Axios = require("axios");
	ATA.Fs = require("fs");
	
	var SiteMapURL = function(loc, lastmod, priority, changefreq){
		this.loc = loc;
		this.lastmod = lastmod; // 2022-04-22T22:37:05+00:00
		this.priority = priority;
		this.changefreq = changefreq;
	};
	
	SiteMapURL.prototype.valueOf = function(){
		return this.toString();
	};
	
	SiteMapURL.prototype.toString = function(){
		var resp = "\n\t<url>";
		resp += "\n\t\t<loc>" + this.loc + "</loc>";
		resp += "\n\t\t<lastmod>" + this.lastmod + "</lastmod>";
		resp += "\n\t\t<priority>" + this.priority + "</priority>";
		resp += "\n\t\t<changefreq>" + this.changefreq + "</changefreq>"; 
		resp += "\n\t</url>";
		return resp;
	};
	
	
	var listofurls = [];
	var theDate = "2022-09-24T20:00:00+00:00";
	
	
	var GetListOfRentProperties = async function(){
		var data;
		var url = "https://api.zeekeez.com/properties/v1/public/properties?businessType=rent&page=";
		var sitemapurl = "https://www.zeekeez.com/en/properties/";
		var page = 1;
		var maxpage = 1;//333;
		do{
			data = await ATA.Axios.get(url + page);
			maxpage = Math.min(data.data.stats["page-count"],333);
			page++;
			data.data.data.map(function(item){
				listofurls.push(new SiteMapURL(sitemapurl + item.slug, theDate, 0.5, "weekly"));
			});
			console.log("Progress [" + ((page/maxpage*100).toFixed(2)) + "%] => [" + page + "/" + maxpage + "]");
		}while(maxpage > page);
		
	};
	
	
	var GetListOfSaleProperties = async function(){
		var data;
		var url = "https://api.zeekeez.com/properties/v1/public/properties?businessType=sale&page=";
		var sitemapurl = "https://www.zeekeez.com/en/properties/";
		var page = 1;
		var maxpage = 1;//333;
		do{
			data = await ATA.Axios.get(url + page);
			maxpage = Math.min(data.data.stats["page-count"],333);
			page++;
			data.data.data.map(function(item){
				listofurls.push(new SiteMapURL(sitemapurl + item.slug, theDate, 0.5, "weekly"));
			});
			console.log("Progress [" + ((page/maxpage*100).toFixed(2)) + "%] => [" + page + "/" + maxpage + "]");
		}while(maxpage > page);
		
	};
	
	var GetListOfBlogPosts = async function(){
		var data;
		var url = "https://api.zeekeez.com/blogs/v1/public/posts?category=blog&page=";
		var sitemapurl = "https://www.zeekeez.com/en/blog/";
		var page = 1;
		var maxpage = 1;//333;
		do{
			data = await ATA.Axios.get(url + page);
			maxpage = Math.min(data.data.stats["totalPages"],30);
			data.data.posts.map(function(item){
				listofurls.push(new SiteMapURL(sitemapurl + item.slug, theDate, 0.8, "weekly"));
			});
			console.log("Progress [" + ((page/maxpage*100).toFixed(2)) + "%] => [" + page + "/" + maxpage + "]");
			page++;
		}while(maxpage > page);
		
	};
	
	
	var GetListOfGuidePosts = async function(){
		var data;
		var url = "https://api.zeekeez.com/blogs/v1/public/posts?category=guide&page=";
		var sitemapurl = "https://www.zeekeez.com/en/guides/";
		var page = 1;
		var maxpage = 1;//333;
		do{
			data = await ATA.Axios.get(url + page);
			maxpage = Math.min(data.data.stats["totalPages"],30);
			data.data.posts.map(function(item){
				listofurls.push(new SiteMapURL(sitemapurl + item.slug, theDate, 0.8, "weekly"));
			});
			console.log("Progress [" + ((page/maxpage*100).toFixed(2)) + "%] => [" + page + "/" + maxpage + "]");
			page++;
		}while(maxpage > page);
		
	};
	
	var sitemapurl = "https://www.zeekeez.com/";
	
	listofurls.push(new SiteMapURL(sitemapurl + "", theDate, "1.0", "daily"));
	
	listofurls.push(new SiteMapURL(sitemapurl + "en/about-us", theDate, 0.3, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/brokers/zeekeez-pricing", theDate, 0.3, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/career", theDate, 0.3, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/contact", theDate, 0.3, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/developers/zeekeez-pricing", theDate, 0.3, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/privacy-policy", theDate, 0.3, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/terms-and-conditions", theDate, 0.3, "weekly"));
	
	listofurls.push(new SiteMapURL(sitemapurl + "en/guides", theDate, 0.3, "daily"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/blog", theDate, 0.3, "daily"));

	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/1-bedroom-apartment-for-rent-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/apartments-for-rent-in-abu-dhabi", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/apartments-for-rent-in-business-bay", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/apartments-for-rent-in-downtown-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/apartments-for-rent-in-dubai-marina", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/apartments-for-rent-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/apartments-for-rent-in-palm-jumeirah", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/apartments-for-rent-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/commercial-for-rent-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/commercial-for-rent-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/houses-for-rent-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/houses-for-rent-in-palm-jumeirah", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/houses-for-rent-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/lands-for-rent-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/luxury-properties-for-rent-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/offices-for-rent-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/properties-for-rent-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/properties-for-rent-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/properties-for-rent", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/property-for-rent-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/stores-for-rent-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/studios-for-rent-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/villas-for-rent-in-abu-dhabi", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/villas-for-rent-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/villas-for-rent-in-palm-jumeirah", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/rent/villas-for-rent-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/apartments-for-sale-in-abu-dhabi", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/apartments-for-sale-in-business-bay", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/apartments-for-sale-in-downtown-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/apartments-for-sale-in-dubai-marina", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/apartments-for-sale-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/apartments-for-sale-in-palm-jumeirah", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/apartments-for-sale-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/commercial-for-sale-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/commercial-for-sale-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/houses-for-sale-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/houses-for-sale-in-palm-jumeirah", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/houses-for-sale-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/lands-for-sale-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/luxury-properties-for-sale-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/offices-for-sale-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/properties-for-sale-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/properties-for-sale-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/properties-for-sale", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/property-for-sale-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/stores-for-sale-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/studios-for-sale-in-uae", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/villas-for-sale-in-abu-dhabi", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/villas-for-sale-in-dubai", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/villas-for-sale-in-palm-jumeirah", theDate, 0.9, "weekly"));
	listofurls.push(new SiteMapURL(sitemapurl + "en/sale/villas-for-sale-in-uae", theDate, 0.9, "weekly"));
	
	ATA.Setups.push(async function(){
		await GetListOfSaleProperties();
		await GetListOfRentProperties();
		await GetListOfBlogPosts();
		await GetListOfGuidePosts();
		console.log("Found " + listofurls.length + " pages.");
		var sitemaptxt = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		sitemaptxt += "\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">";
		sitemaptxt += listofurls.join("");
		sitemaptxt += "\n</urlset>";
		ATA.Fs.writeFile("sitemap - " + (new Date()).getTime() + ".xml", sitemaptxt, function(err){
			if (err) return console.log(err);
			console.log("Saved!");
		});
		  
	});
	
})(require("./ata.js"));