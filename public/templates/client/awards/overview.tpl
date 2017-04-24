<div class="ns-awards-overview">
    <!-- IMPORT partials/breadcrumbs.tpl -->

    <!-- BEGIN awards -->
    <div class="ns-awards-overview__item">
        <div class="ns-awards-overview__image">
            <img src="{awards.url}" class="img-responsive"/>
        </div>
        <div class="ns-awards-overview__details">
            <span class="ns-awards-overview__title">{awards.name}</span>
            <span class="ns-awards-overview__desc">{awards.desc}</span>
        </div>
        <div class="ns-awards-overview__users">
            <!-- BEGIN awards.granteesUnique -->
            <div class="ns-awards-overview__user">
                <span class="ns-awards-overview__count">{awards.granteesUnique.duplicateCount} x</span>
                <span class="ns-awards-overview__username"><a href="./user/{awards.granteesUnique.userslug}">{awards.granteesUnique.username}</a></span>
            </div>
            <!-- END awards.granteesUnique -->
        </div>
    </div>
    <!-- END awards -->
</div>