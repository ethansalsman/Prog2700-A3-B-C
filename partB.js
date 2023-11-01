// IIFE
(() => {

	//Choose an array method to implement for each of the incomplete functions.
	//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then((response) => response.json())
    .then((json) => {

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.
        function getGuntherCount(json) {
            const episodes = json._embedded.episodes;
            // . filter episodes searching for Gunther
            const guntherEpisodes = episodes.filter(episode => episode.summary.includes('Gunther'));
            return guntherEpisodes.length;
        }
        
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        function getTotalRuntimeMinutes(json) {
            const episodes = json._embedded.episodes;
            const totalRuntime = episodes.reduce((total, episode) => total + episode.runtime, 0);
            return totalRuntime;
        }
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        function getTotalEpisodesInYear(json, year) {
            const episodes = json._embedded.episodes;
            // filter through airdate and assining year to 2000
            const totalEpisodes = episodes.filter(episode => episode.airdate.includes(year));
            return totalEpisodes.length;
        }
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        function getFemaleCastMembers(json) {
            // access cast members
            const cast = json._embedded.cast;
            // access female cast members
            const femaleCast = cast.filter(member => member.person.gender === 'Female');
            //assign them to an array
            const femaleCastNames = femaleCast.map(member => member.person.name);
            return femaleCastNames;
        }
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        function getEpisodeTitles(json, string) {
            // string is included and then will be assinged to ursula
            const episodes = json._embedded.episodes;
            const matchingEpisodes = episodes.filter(episode => episode.summary.includes(string));
            const matchingEpisodeTitles = matchingEpisodes.map(episode => episode.name);
            return matchingEpisodeTitles;
        }
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        function getCastMembersOver55(json) {
            const cast = json._embedded.cast;
            // finter through cast members and assign them to over 55
            const castMembersOver55 = cast.filter(member => member.person.age > 55);
            // assign them to an array
            const castMembersOver55Names = castMembersOver55.map(member => member.person.name);
            return castMembersOver55Names;
        } 
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        function getTotalRuntimeMinutesExcludingSeasonSix(json) {
            const episodes = json._embedded.episodes;
            // filter through episodes and exclude season 6
            const episodesExcludingSeasonSix = episodes.filter(episode => episode.season !== 6);
            // assign them to an array
            const episodesExcludingSeasonSixRuntime = episodesExcludingSeasonSix.map(episode => episode.runtime);
            // add them together
            const totalRuntime = episodesExcludingSeasonSixRuntime.reduce((total, episode) => total + episode, 0);
            return totalRuntime;
        }
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        function getFirstFourSeasons(json) {
            const episodes = json._embedded.episodes;
            // filter through episodes and assign them to first four seasons
            const firstFourSeasons = episodes.filter(episode => episode.season <= 4);
            // assign them to an array
            const firstFourSeasonsJSON = firstFourSeasons.map(episode => {
                return {
                    season: episode.season,
                    name: episode.name
                }
            });
            return firstFourSeasonsJSON;
        }
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));

        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        function getEpisodeTallyBySeason(json) {
            const episodes = json._embedded.episodes;
            // filter through episodes and assign them to seasons
            const seasons = episodes.map(episode => episode.season);
            // assign them to an array
            const seasonsArray = [...new Set(seasons)];
            // assign them to an object
            const seasonsObject = {};
            // loop through seasons and assign them to an object
            seasonsArray.forEach(season => {
                seasonsObject[season] = episodes.filter(episode => episode.season === season).length;
            });
            return seasonsObject;
        }
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.
        function capitalizeTheFriends(json) {
            const episodes = json._embedded.episodes;
            // loop through episodes and capitalize the names
            const capitalizedEpisodes = episodes.map((episode) => {
                episode.name = episode.name
                    .replace("Joey", "JOEY")
                    .replace("Chandler", "CHANDLER")
                    .replace("Monica", "MONICA")
                    .replace("Rachel", "RACHEL")
                    .replace("Phoebe", "PHOEBE")
                    .replace("Ross", "ROSS");
                episode.summary = episode.summary
                    .replace("Joey", "JOEY")
                    .replace("Chandler", "CHANDLER")
                    .replace("Monica", "MONICA")
                    .replace("Rachel", "RACHEL")
                    .replace("Phoebe", "PHOEBE")
                    .replace("Ross", "ROSS");
                return episode;
            });
            console.log("--------------------------------");
            console.log("Capitalized Friends");
            console.log(capitalizedEpisodes);
            return capitalizedEpisodes;
        }

        
        capitalizeTheFriends(json);

    
    });
	// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
	// (or a combination) ON THE PROVIDED JSON DATA

	// Define the required ten functions below this line...


    // 1 filters through episode wiht the dot method to find the string Gunther.
        // this is done by using .includes foollowed by the desrired string

    // 2 reduce the total runtime minutes for all episodes  
        //  .reduce to add the total runtime minutes
        // by using dot method to access the runtime minutes thorugh the episodes.

    // 3 filter through airdate and assining year to 2000
        // this is done by using .includes followed by the desired year wich will be assigned as a string
    
    // 4 access cast members
         // access members then gender and assign the gender to female
         // then map them t an array

    // 5 string is included and then will be assinged to ursula
     // filter through episodes and assign them to ursula
        // then map them to an array

    // 6 finter through cast members and then through age 
        // assign them to over 55
        // then map them to an array

    // 7 filter through episodes and exclude season 6
        // then map them to an array
        // then add them together using .reduce for the total runtime.

    // 8 filter through episodes and assign them to first four seasons
        // then map them to an array
        // then display them as a JSON object

    // 9 filter through episodes and assign them to seasons
        // then assign them to an array
        // then assign them to an object
        // loop through seasons and assign them to an object

    // 10 loop through episodes and capitalize the names
        // then display them as a JSON object
        // repeat the sumarry process




})();



