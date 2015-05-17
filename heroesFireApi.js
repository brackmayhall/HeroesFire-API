var express = require('express');
var request = require('request');
var app     = express();
var select = require('soupselect').select;
var htmlparser = require("htmlparser");

var url = 'http://www.heroesfire.com/hots/wiki/heroes';
var abilitySlug = '?kit';
var domainUrl = 'http://www.heroesfire.com';

// ingest hero html and return hero json object
function ingestHeroHTML(url,res){

	request(url, function(error, response, html){
		if(!error){

        // now we have the whole body, parse it and select the nodes we want...
        var handler = new htmlparser.DefaultHandler(function(err, dom) {
            if (err) {
                console.log("Error: " + err);
            } else {

                var tempHero = {};

                tempHero.name = buildHeroName(select(dom,'.col-l .box h2'));
                tempHero.role = buildHeroRole(select(dom,'.hero-stats'));
                tempHero.franchise = buildHeroFranchise(select(dom,'.hero-stats'));
                tempHero.price = buildHeroPrice(select(dom,'.hero-stats'));
                tempHero.stats = buildHeroStats(select(dom,'.hero-stats table tr'));
                tempHero.trait = buildHeroTrait(select(dom,'.tab-contents'));
                console.log(tempHero.trait);

            }
        });

        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(html);
        res.send(html);

		} else{
			res.send('error');
		}
	})

}

function buildHeroName(html){
	return html[0].children[0].raw;
}

function buildHeroRole(html){
	return html[0].children[6].raw.trim();
}

function buildHeroFranchise(html){
	return html[0].children[10].raw.trim();
}

function buildHeroPrice(html){
	var priceString = html[0].children[14].raw.trim();
	var words = priceString.split(" ");
	var usdPrice = parseFloat(words[0].replace('$',''));
	var goldPrice = words[3];

	var priceObj = {usd:usdPrice,gold:goldPrice};
	return priceObj;
}

function buildHeroTrait(html){
	var traitIcon = domainUrl + html[0].children[1].children[7].children[1].children[1].children[1].children[1].attribs['src']

	// image 
	var detailHTML = html[0].children[1].children[7].children[2];
	var name = detailHTML.children[1].children[0].children[0].raw.trim();
	console.log(name);
}

function buildHeroPrimaryAbilities(html){
	console.log(html[0].children[3]);
}

function buildHeroHeroisAbilities(html){
	console.log(html[0].children[5]);
}

function buildHeroStats(html){

	var stats = [];

	html.forEach(function(tr) {

		var type = tr.children[1].children[0].children[0].raw.trim().toLowerCase();

		// need to look at color to figure out if it is health regen or mana regen
		var color = tr.children[1].children[0].attribs['style'];
		
		switch(type) {
		    case 'health':
			    {
	    			var healthStat = statBuilder(tr,type);
			        stats.push(healthStat);
			    }

		        break;
		   	case 'mana':
				{
	    			var manaStat = statBuilder(tr,type);
			        stats.push(manaStat);        
				}
		        break;
		   	case 'regen':
			   	{
			   		if(color === 'color:#ff8000;'){
		    			var healthRegenStat = statBuilder(tr,'health '+type);
				        stats.push(healthRegenStat);	  
			   		} else if (color === 'color:#00ffff;') {
		    			var manaRegenStat = statBuilder(tr,'mana '+type);
				        stats.push(manaRegenStat);
			   		} else {
				        console.log('err');
			   		}
			   	}
		        break;		      
		    case 'atk speed':
		        {
	    			var attackSpeedStat = statBuilder(tr,type);
			        stats.push(attackSpeedStat);
		        }
		        break;
		    case 'damage':
		        {
	    			var damageStat = statBuilder(tr,type);
			        stats.push(damageStat);
		        }
		        break;	     
		    default:
		        console.log('default');
		}
		
	});

	return stats;
}

function statBuilder(tr,type){
	var o = {};

	var val = parseFloat(tr.children[2].children[0].raw);

	if(type === 'atk speed') {
		o = {type:type,value:val,offset:0.0};
	} else {
		var offset = parseFloat(tr.children[3].children[1].children[0].raw);
		o = {type:type,value:val,offset:offset};
	}
     
    return o;
}

// hero endpoints
app.get('/abathur', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/anubarak', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/arthas', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/azmodan', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/brightwing', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/chen', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/diablo', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/elite-tauren-chieftain', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/falstad', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/gazlowe', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/illidan', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/jaina', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/kaelthas', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/kerrigan', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/li-li', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/malfurion', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/muradin', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/murky', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/nazeebo', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/nova', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/raynor', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/rehgar', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/sergeant-hammer', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/sonya', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/stitches', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/sylvanas', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/tassadar', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/the-lost-vikings', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/thrall', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/tychus', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/tyrael', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/tyrande', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/uther', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/valla', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/zagara', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.get('/zeratul', function(req, res){
	ingestHeroHTML(url+req.route.path+abilitySlug,res);
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app; 

/*
abathur
anubarak
arthas
azmodan
brightwing
chen
diablo
elite-tauren-chieftain
falstad
gazlowe
illidan
jaina
kaelthas
kerrigan
li-li
malfurion
muradin
murky
nazeebo
nova
raynor
rehgar
sergeant-hammer
sonya
stitches
sylvanas
tassadar
the-lost-vikings
thrall
tychus
tyrael
tyrande
uther
valla
zagara
zeratul
*/


/*
			var heroHtml = select(html, '.hero-image');
			console.log(heroHtml);
			fs.writeFile("output.html", html, function(err) {
				if(err) {
					return console.log(err);
				}

				console.log("The file was saved!");
			}); 
			res.send(html);
			*/