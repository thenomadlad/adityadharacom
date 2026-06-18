import { createMemo, createSignal, For } from "solid-js";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  pubDate: string;
  heroImage: string;
  tags: string[];
}

interface Props {
  posts: Post[];
}

export default function BlogGrid(props: Props) {
  const [selectedTags, setSelectedTags] = createSignal<string[]>([]);

  const allTags = createMemo(() => {
    const tagSet = new Set<string>();
    for (const post of props.posts) {
      for (const tag of post.tags) tagSet.add(tag);
    }
    return [...tagSet].sort();
  });

  const filteredPosts = createMemo(() => {
    const selected = selectedTags();
    if (selected.length === 0) return props.posts;
    return props.posts
      .map((p) => ({
        ...p,
        matchCount: p.tags.filter((t) => selected.includes(t)).length,
      }))
      .filter((p) => p.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);
  });

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <div>
      <div class="flex flex-wrap gap-2 mb-6">
        <For each={allTags()}>
          {(tag) => (
            <button
              onClick={() => toggleTag(tag)}
              class={`px-3 py-1 rounded-full text-sm border-2 transition-colors cursor-pointer ${
                selectedTags().includes(tag)
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              {tag}
            </button>
          )}
        </For>
      </div>

      <div class="inline-grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-x-4 gap-y-4 mb-4 w-full">
        <For each={filteredPosts()}>
          {(post, index) => (
            <a
              href={`/blog/${post.id}`}
              class={`block ${selectedTags().length === 0 && index() === 0 ? "col-span-2" : ""}`}
            >
              <div class="flex flex-col rounded border-2 overflow-hidden shadow-lg bg-white h-full">
                <img
                  class="block object-cover w-full aspect-3/2"
                  src={post.heroImage}
                  alt={post.title}
                />
                <div class="px-4 py-3 font-bold text-xl text-center">
                  {post.title}
                </div>
                <div class="px-4 pb-2 text-center text-slate-500 text-sm">
                  {format(new Date(post.pubDate), "yyyy-MM-dd")}
                </div>
                <div class="px-4 pb-4 flex flex-wrap gap-1 justify-center mt-auto">
                  <For each={post.tags}>
                    {(tag) => (
                      <span
                        class={`px-2 py-0.5 rounded-full text-xs ${
                          selectedTags().includes(tag)
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    )}
                  </For>
                </div>
              </div>
            </a>
          )}
        </For>
      </div>
    </div>
  );
}
