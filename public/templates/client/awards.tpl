<div class="ns-awards">
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
            <!-- BEGIN awards.grantees -->
            <span class="award-recipient"><a href="./user/{awards.grantees.userslug}">{awards.grantees.username}</a></span>
            <!-- END awards.grantees -->
        </div>
    </div>
    <!-- END awards -->
</div>