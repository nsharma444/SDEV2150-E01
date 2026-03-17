// temporarily unused, not actually a component also missing imports

      {/* The following is not great for UX/UI, but it gets the point across. Feel free to style
      the loading and error states in "nicer" way. */}
      {isLoading && (
        <div className="text-sm text-base-content/70">Loading resources...</div>
      )}
      {error && (
        <div className="alert alert-error">
          <div>
            <p className="font-semibold">Could not load resources</p>
            <p className="text-sm opacity-80">{error.message}</p>
            <button className="btn btn-sm mt-2" onClick={refetch}>Try again</button>
          </div>
        </div>
      )}
      <aside className="md:col-span-3 lg:col-span-1">
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategories={selectedCategories}
          onCategoryToggle={setSelectedCategories}
          openNowOnly={openNowOnly}
          onOpenNowChange={setOpenNowOnly}
          virtualOnly={virtualOnly}
          onVirtualOnlyChange={setVirtualOnly}
        />
      </aside>
      <section className="md:col-span-2 lg:col-span-1">
        <Results
          resources={resources}
          selectedResource={selectedResource}
          onSelectResource={setSelectedResource}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          openNowOnly={openNowOnly}
          virtualOnly={virtualOnly}
        />
      </section>
      <aside className="md:col-span-1 lg:col-span-1">
        {selectedResource ? (
          <Details resource={selectedResource} />
        ) : (
          <div className="text-sm text-base-content/70">
            Select a resource to view details.
          </div>
        )}
      </aside>
