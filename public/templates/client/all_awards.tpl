<div class="awards">
    <!-- IMPORT partials/breadcrumbs.tpl -->

    <!-- BEGIN awards -->
    <div class="row awards-overview">

        <div class="col-md-1">
            <img src="{awards.picture}" class="img-responsive"/>
        </div>
        <div class="col-md-6 award-summary">
            <span class="award-title">{awards.name}</span>
            <span class="award-desc">{awards.desc}</span>
        </div>
        <div class="col-md-5 award-owners">
            <!-- BEGIN awards.grants -->
            <span class="award-recipient"><a
                        href="./user/{awards.grants.user.userslug}">{awards.grants.user.username}</a></span>
            <!-- END awards.grants -->
        </div>
    </div>
    <!-- END awards -->
</div>