import {TemplateTag, stripIndentTransformer} from 'common-tags';

// The default `stripIndent` from `common-tags` also does a `trim` which we don't want.
// This new one just strips indentation.
export const stripIndent = new TemplateTag(stripIndentTransformer());
