module Jekyll
  module Filters
    def sort_tags_list(tags)
      #sorted_tags = tags.keys.sort_by! { |tag| tag.downcase }
      tags.sort { |a, b| b[1].size <=> a[1].size }
    end
  end
end
