import { defineDocumentType, FieldDefs, makeSource } from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypePrism from 'rehype-prism';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

const fields: FieldDefs = {
  title: { type: 'string', required: true },
  description: { type: 'string', required: true },
  tags: { type: 'list', required: true, of: { type: 'string' } },
  thumbnail: { type: 'string', required: false },
  createdAt: { type: 'date', required: true },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,
  fields,
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    readingMinutes: {
      type: 'string',
      resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes),
    },
    wordCount: {
      type: 'number',
      resolve: (post) => post.body.raw.split(/\s+/gu).length,
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      rehypePrism,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener noreferrer'],
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
        },
      ],
    ],
  },
});
