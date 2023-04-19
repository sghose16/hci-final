function brandMatching(itemBrand, targetBrands) {
    if (itemBrand !== undefined) {
      for (let j = 0; j < targetBrands.length; j++) {
        if (
          targetBrands[j].toLowerCase().trim() ===
          itemBrand.toLowerCase().trim()
        ) {
          return true;
        }
      }
    }
    return false;
}

function tagsMatching(itemTags, targetTags) {
    if (itemTags !== undefined) {
        for (let i = 0; i < itemTags.length; i++) {
            for (let j = 0; j < targetTags.length; j++){
                if (itemTags[i].toLowerCase().trim() === targetTags[j].toLowerCase().trim()) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * Takes all items loaded from database and applies filter to sort which items
 * should actually be shown
 *
 */
function filterItems(all, filterLabel) {
    const filteredItems = new Set();

    for (let i = 0; i < all.length; i++) {
        const item = all[i];
        let match = true;
        let j = 0;
        let keys = Object.keys(filterLabel);
        while (match && j < keys.length) {
        let key = keys[j];
        if (key === "brand") {
            match = brandMatching(item[key], filterLabel[key]);
        } else if (key === "favorite") {
            match = item[key] === filterLabel[key];
        } else {
            match = tagsMatching(item[key], filterLabel[key]);
        }
        j++;
        }
        if (match) {
            filteredItems.add(item);
        }
    }
    return Array.from(filteredItems);
}

  export default filterItems;

