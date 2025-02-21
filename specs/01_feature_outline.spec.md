# Specification Template
> Ingest the information from this file, implement the Low-Level Tasks, and generate the code that will satisfy the High and Mid-Level Objectives.

## High-Level Objective

1. Check for the `saigo` URL parameter to conditionally change the privacy policy link reference.
2. Create a new sign-up page with a different daisy UI theme.
3. Integrate Google reCAPTCHA v3 for the new sign-up page.
4. Add Google Auth and Magic Link sign-in options to the new sign-up page.
5. After successful sign-in, navigate to a page describing the AI-generated username approach.
6. Implement the LLM-based username generator, ensuring uniqueness in the Supabase Username table.
7. On successful username creation, store it in Supabase and redirect to the competition leaderboard.
8. Build the hidden competition leaderboard with ranking logic and the “Alisone” total sum.
9. Add the “Use the Force” button at the top of the leaderboard to open a new form.
10. Implement the form for recording daily activities (minutes) and hooking into the pseudo-random reward logic.
11. Update the Force table with total points, applying a 2% chance per minute to multiply by 10.
12. Enforce a once-per-day submission limit, returning an error or disabling the form accordingly.
13. Provide a visual or textual confirmation upon successful or failed daily submission.


## Mid-Level Objective

- [List of mid-level objectives - what are the steps to achieve the high-level objective?]
- [Each objective should be concrete and measurable]
- [But not too detailed - save details for implementation notes]

## Implementation Notes
- [Important technical details - what are the important technical details?]
- [Dependencies and requirements - what are the dependencies and requirements?]
- [Coding standards to follow - what are the coding standards to follow?]
- [Other technical guidance - what are other technical guidance?]

## Context

### Beginning context
- [List of files that exist at start - what files exist at start?]

### Ending context  
- [List of files that will exist at end - what files will exist at end?]

## Low-Level Tasks
> Ordered from start to finish

1. [First task - what is the first task?]
```aider
What prompt would you run to complete this task?
What file do you want to CREATE or UPDATE?
What function do you want to CREATE or UPDATE?
What are details you want to add to drive the code changes?
```
2. [Second task - what is the second task?]
```aider
What prompt would you run to complete this task?
What file do you want to CREATE or UPDATE?
What function do you want to CREATE or UPDATE?
What are details you want to add to drive the code changes?
```
3. [Third task - what is the third task?]
```aider
What prompt would you run to complete this task?
What file do you want to CREATE or UPDATE?
What function do you want to CREATE or UPDATE?
What are details you want to add to drive the code changes?
```
