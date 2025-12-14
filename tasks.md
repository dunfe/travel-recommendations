Task 6: Recommendation results
Now, you need to create logic in your JavaScript file to show results for your recommendations.

Note: You should check the output of your code while developing your JavaScript. Directions to view your output are on the next page of these instructions.

Fetch data from the travel_recommendation_api.json file using the fetch API method, from there you can fetch travel-related details, such as the name of the place. You need to have your own images for every imageUrl in the JSON file.



Fetch the data from the JSON using the fetch API() method. To check if you can access the data, you use console.log to see if the result is displayed.

It is good if the console.log logs the data. Otherwise, you need to look for a different API.

Task 7: Keyword searches
In this task, you will write JavaScript to accept these keywords and variations the user will enter in the search field in your navigation bar on the home page.

For example, if the user enters "beach," or "beaches," "Beach" or "BEACH," then you need to write JavaScript code so that it accepts all variations of this keyword.

For uppercase letters in the keyword, you can convert them to lowercase in your JavaScript using the string manipulation toLowerCase() method.

Similarly, you need to create logic to match keywords entered for temples and countries.

The website should display results only after the user clicks the Search button.

Task 8: Recommendations
In this task, you need to fetch the details of the places you recommend based on which keyword the user enters: beach, temple, or country.

For each of these three keywords, your results should display at least two recommendations, an image, and a description