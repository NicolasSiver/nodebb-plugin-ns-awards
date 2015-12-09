<!-- IF awards.length -->
<div class="panel panel-default">
    <div class="panel-body">

        <ul class="profile-awards">
            <!-- BEGIN awards -->
            <li>
                <div class="media">
                    <div class="media-left award-image">
                        <img src="{awards.award.picture}"/>
                    </div>
                    <div class="media-body award-summary">
                        <span class="award-title">{awards.award.name}</span>
                        <span class="award-reason">{awards.reason}</span>
                        <span class="award-info">
                            handed <span class="timeago" title="{awards.createtimeiso}"></span> by <a
                                    href="./{awards.fromuser.userslug}">{awards.fromuser.username}</a>
                        </span>
                    </div>
                </div>
            </li>
            <!-- END awards -->
        </ul>

    </div>
</div>
<!-- ENDIF awards.length -->
