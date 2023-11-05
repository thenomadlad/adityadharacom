---
title: "Spite seems to be my best motivator for software work"
description: "Somehow I find myself realizing that I am building things out of hate"
pubDate: "Jan 15 2023"
heroImage: "/blog/spite-as-a-motivator/spite-soda.jpg"
---

During my performance reviews last year, I was confident I’d get a promotion to a Senior Engineer IC role (equivalent to an L4 at Google). I had already been scaling up, I was mentoring junior engineers, and I was working with multiple teams in my department. But then I heard from an engineer in the technical review panel that my work quality until that point didn’t cut it. I was upset, but later I found that my company decided to promote me anyway with the expectation that I’d fill the gaps very quickly.

That didn’t sit well with me. I was really bothered that there was a huge mismatch between my company’s assessment of me and my own. I thought I was performing my new role already, I thought my promotion was a slam dunk, but in reality it wasn’t and it required a large amount of trust that I’d grow into my new role. I had enough examples of quality work that stood out from the rest of the company, so what gives? Why was I an unsure promotion?

## I didn't work because I was motivated to work for the wrong reasons

I had a few long talks with other more senior engineers and managers, and I found that the issue wasn’t in my ability, but in my consistency. There were two particular aspects of the software development process that the technical review panel wasn’t sure about - writing design documentation and code reviews. They were essential parts of my new role and when I did them, I did them well, but there were numerous other times when I didn’t participate in either of them. The talks brought me to the very sobering realization that my problem lay very deep in my psyche: I had a problem of motivation. I only worked on projects that felt epic or showed my prowess over other teams. It was an unhealthy mix of pride and spite that drove me to finish work, and my managers rightly couldn't trust that as a source of continuing growth and responsibility to build the technology my company needs

### Design documentation

It wasn't that I didn't enjoy working on software design, it was just a lot of effort getting thoughts on paper. Any google search shows a hundred ways to structure software design documents, and a thousand ways to draw architecture diagrams. Of course, my company's solution to that problem was to create their own standard. For my team's work, I would use [the minimalist template that the rust team uses](https://github.com/rust-lang/rfcs/blob/master/0000-template.md) until I had to flesh it out for other teams or leaders to see.

The worst part is, the design documentation seemed to go out of date after a few sprints. There was nothing tying the documentation with the actual software, checking that they are accurate to each other. If there were automated tools to check documents and code were synchronized, it’d help my team keep everything up to date. Instead, I simply had to add process and regular manual work to track our outdated material and keep them up to date.

**_Note:_** On that topic, I'm keeping a close eye on the [Open Application Model](https://oam.dev/) and the [kubevela](https://kubevela.io/) projects. I think it’ll help write a representation of an application and its components that we can validate the structure of our code against, and generate documentation from it.

I understood that documentation was helpful, but usually I’d only write something out to keep my bosses at bay or to expound a contradictory opinion. My best writing was showing something was better, it wasn’t showing how it could help ourselves work better. The benefit of my team was not sufficient to overcome the friction of writing and maintaining documents. I was someone who wrote because it was easier than telling people to shut up or to listen to me

### Code reviews

I found code reviews to also be tedious but in a different way. We have a large number of tools to review code well, and my company also makes sure to automate checks for code standards, smells and best practices (see [sonarqube](https://www.sonarqube.org/)). The expectation on me as a code reviewer was to criticize to improve the structure and design of our code. Along the way, I was also meant to teach other engineers things.

This was just not as interesting as making something new. There wasn’t any glory to reading and criticizing code. I’d participate in code reviews that had large changes and structurally changed something about the services in our department. This wasn’t what my team needed - I was to foster a culture of smaller incremental changes with proper testing. I didn’t really follow that myself because there was just nothing for me to be angry or proud about if I work with smaller changes

## When It did work, pride was a really effective motivator

During my performance review, I did have sufficient new code, and design documentation and code reviews. No matter how toxic my motivation, I only had certain projects in which I performed well - projects that proved some form of dissatisfaction with the status quo. However, even though I completed projects, there was a lot to unpack from them. Here are some of the unhealthy motivations that worked, and what I realized won't help me in the long run.

### Show everyone how ML services should be done

My department is learning to leverage ML for everything. However, most engineers were unfamiliar with the engineering considerations of the ML life cycle. I don't mean just serving the data, but actually helping with the ML training and feedback process:

1.  Having a good way to log all our ML model predictions
2.  Design interfaces for AB testing multiple models in
3.  Tie the individual predictions to revenue generating activities

I thought my department was a whole decade behind the state-of-the-art in all the above. So with the motivation to show them what they need to learn, I spent about 4-5 sprints standing up a service with the necessary controls to make the above happen.

Now, one year down the line, no other team in my department followed my example. I moved the needle for my project but I should have done it in a way that was extensible and providing the dos and don'ts to get other teams to follow my example

### Show that we don't need to use in-house services to make something work

For whatever reason, my company chose not to use spring-boot in our java services. We had some mix of guice, dropwizard and some custom configuration management tools to stand up a java service. As soon as I built the above service, I immediately migrated it to spring-boot. I was probably one of the first services in my department to do so. This was something that I'm sure showed my design, coding and code-review skills to give me a promotion. However, it was from wanting to use something outside my company that was clearly better and show everyone it wasn't just possible, but better

Same as above, I didn't have a good outline for other teams to follow, but luckily for me, I didn't have to take responsibility for using spring-boot. I watched the java platform team in my company outlined the best practices and created a path for teams to migrate.

### Show there is a simple and effective way to do something an entire team has been incompetent at

Not enough people read manuals and have deep understanding of the tools they use in development. There was a team which worked on AB testing, and they built something in-house with a 10ms SLA which was horrible for the use cases we had (we might want to check on 10-20 AB-tests over the course of a customer's visit to our site). Just to prove that a better system was possible, I showed that I could configure an envoy proxy to assign customers to either branch of an AB test with microsecond latency

This was something I did as a hack week project at my company over the course of a few hours. Although I didn't create something we used, I did complain and show off to some managers in my department

## So how do I find a better motivation for the work I do?

My goal in life is not to continue proving to everyone that I'm better than them or entire teams in my company. All I’d become is a very stubborn engineer who wasn’t happy even when I made cool software. After learning all the above about myself, it was time to correct my course and work towards building things for better reasons.

In college I wanted to become an engineer because making things to help people felt really fulfilling. Knowing that I wanted to get back to that, I read of plethora of posts from other more successful engineers, and watched YouTube videos on motivation, meaning and drive to work (especially on things I might not like)

### Learning something new from my projects

It's not like I didn't focus on learning before, I just never looked at projects as individual learning experiences. Today, I make sure to include at least one new practice, tool or technique into my projects that I can use as the thing that gets me to the finish line. Even when it’s a stretch and I have to try hard to fit something in, I do so. Even the smallest bit of learning helped me find value in work that I might not have enjoyed earlier

### Focusing on customer problems

Whether this is building a new feature or driving a KPI in my company that I agree with, I'm learning to focus on customer needs. This is a huge topic on its own and I can't do justice in one paragraph (nor do I know enough to write such an article anyway). Instead I'll leave it to you to find content online about customer focus and KPIs. Nevertheless, my motivation to work on tasks has improved after developing customer focus. By definition such focus means I’m finding my work is beneficial to someone, and the sense of fulfillment can really keep me going a long time

### Developing an entrepreneurship mindset

This one is a weird twist of logic, but here goes: if I perceive my work as me selling my time to the company, I look at it as a place where I need to do whatever it takes to get that job done. It's almost like I make the boring work into transactional activities that I’m selling to my company, and then my work ethic kicks in and I'm able to perform consistently

### Finding teachable moments in everything I do

I also learned to look at code reviews as a teaching activity - my company didn't just buy my time and energy to build things, but to spread my knowledge among it's engineers too. In other words, the time I’m selling to review code is actually time I’m selling to teach skills. This makes the tedious work seem much more valuable, helpful and fulfilling.

## Has this helped?

I don’t think I’ve fixed everything in my mindset, but those few improvements have already reduced my stress levels at work, and I feel much more synchronized with the goals of my department. I still do some work out of pride and spite, but I think it's not the only reason I take on complex work and projects anymore.

One more practice I’m trying to develop is to communicate those parts of my work that I dislike. I’m finding the customer focus to be helpful here - tie everything I dislike to impacts on KPIs and revenue. I think I still have trouble letting go of my complaints if I can't convince my department leaders that what I hate is worth acting on. However, I do think I’m getting better at focusing on the right motivations to do thingsthings
