<script>

	import { browserPopupRedirectResolver } from "firebase/auth";

</script>
<h1>Splitting a complex model into pieces</h1>

<p>
    A search engineer is given a model or sequence of steps which
    makes it necessary to judge what runs at query time and what happens at index time

    1. we need to figure out the operations that are dependent on query and customer information
    2. we need to figure out the operations that are only dependent on document
    3. We need to figure out the operations that require both

    Instead of making all the manual work, I'd like to propose a way to automate away this process for
    large models:
    - take an onnx model, examine the graph
    - color the nodes that are dependent on query
    - color the nodes that are dependent on document
    - identify the ndoes that can be split this way

    Experimenting with this process:
    1. a simple tf-idf model
    2. a two tower model with cosine similarity at the end
    3. two tower model with complex interactions combining query and document embeddings
    4. generative model that uses products as tokens in a language
    5. [other recs models]
</p>
